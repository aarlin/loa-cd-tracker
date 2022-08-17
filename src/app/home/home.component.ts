import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { classes } from '../../constants/classes';
import { skills } from '../../constants/skills';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  classes = classes;
  testForm = new FormGroup({
    testValue: new FormControl(`orange`),
  });
  tag = 'hello';

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  public getClassAvatar(className: string): any {
    if (className in classes) {
      return `./assets/images/classes/${className}.png`
    }
    return`./assets/images/classes/Warrior.png`
  }

  public getSkills(className: string): any[] {
    return skills.filter(skill => skill.class === className);
  }


  public getSkillImage(id: number): any {
    if (id > 99999) return this.getSkillImage(id / 10);
    const s = this.getSkill(id);
    if (id % 5 && !(s?.icon)) return this.getSkillImage(id - id % 5);

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

}
