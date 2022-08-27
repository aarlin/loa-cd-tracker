import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { classes } from '../../constants/classes';
import { skills } from '../../constants/skills';
import { singleClass } from '../../constants/enabledClasses';
import {
  appWindow,
  WebviewWindow,
  LogicalSize,
  UserAttentionType,
  PhysicalSize,
  PhysicalPosition
} from '@tauri-apps/api/window';
import { CharacterStoreService } from '../shared/store/character.service';
import { CharacterFacadeService } from '../shared/store/character-facade.service';
import { AnyCnameRecord } from 'dns';
import { CharacterStoreState } from '../shared/models/character.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // classes = classes
  classes = singleClass;
  testForm = new FormGroup({
    testValue: new FormControl(`orange`),
  });
  tag = 'hello';
  enabledClasses = ['Wardancer'];

  selectedWindow = appWindow.label;
  selectedWindowTitle = appWindow.title;
  windowMap = {
    [appWindow.label]: appWindow
  }
  characters$: Observable<CharacterStoreState> = this.facadeService.getCharacters();
  characters: any;

  constructor(private router: Router, private facadeService: CharacterFacadeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.facadeService.getCharacters().subscribe(state => {
      if (state) {
        this.characters = state.characters;
        console.log(this.characters);
        this.cdr.detectChanges();
      }
      // this.characters$.next()
    })

  }

  public getClassAvatar(className: string): any {
    if (className in classes) {
      return `./assets/images/classes/${className}.png`
    }
    return`./assets/images/classes/Warrior.png`
  }

  public getSkills(className: string): any[] {
    const classSkills = skills.filter(skill => skill.class === className);
    return classSkills.slice(0, 11);
  }

  public getSkillImage(id: number, className?: string): any {
    if (className && this.enabledClasses.includes(className)) {
      if (id > 99999) {
        return this.getSkillImage(id / 10);
      }
      const s = this.getSkill(id);
      if (id % 5 && !(s?.icon)) {
        return this.getSkillImage(id - id % 5);
      }
  
      if (s != null && this.skillHasIcon(s)) {
        return `assets/images/skills/${className.toLowerCase()}/${s.id}_${(s?.display ?? s.name).replace(":", "-")}.webp`;
      }
  
      return `assets/images/skills/unknown.png`;
    }

    if (id > 99999) {
      return this.getSkillImage(id / 10);
    }
    const s = this.getSkill(id);
    if (id % 5 && !(s?.icon)) {
      return this.getSkillImage(id - id % 5);
    }

    if (s != null && this.skillHasIcon(s)) {
      return `assets/images/skills/${s.id}_${(s?.display ?? s.name).replace(":", "-")}.png`;
    }

    return `assets/images/skills/unknown.png`;
  }

  public getSkillName(skill: any) {
    const s = this.getSkill(skill.id);

    if (s != null) {
      if ('display' in s) return s.display;
    }
    return skill.name;
  }

  public skillHasIcon(s: any) {
    if (s.name.startsWith("Basic Attack") || s?.display?.startsWith("Basic Attack") || !(s?.icon ?? true))
      return false;
    return true;
  }

  public getSkill(id: any) {
    return skills.find((k) => k.id == id);
  }
  
  public menuItem() {
    console.log('ok');
  }

  public minimizeWindow() {
    this.windowMap[this.selectedWindow].minimize()
  }

  public closeWindow() {
    this.windowMap[this.selectedWindow].close()
  }

  public async startDrag() {
    await appWindow.startDragging();
  }

}
