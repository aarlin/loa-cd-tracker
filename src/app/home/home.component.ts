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
      return new URL(`../../assets/images/classes/${className}.png`, import.meta.url).href;
    }

    return new URL(`../../assets/images/classes/Warrior.png`, import.meta.url)
      .href;
  }

  public getSkills(className: string): any[] {
    return skills.filter(skill => skill.class === className);
  }

}
