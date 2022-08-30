import { Attribute, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { getCooldownBySkillId, getCooldownBySkillName } from '../../utils/utils';

@Directive({
  selector: '[cooldown]'
})
export class CooldownDirective {
  SKILL_CLASS = 'skill';
  DISABLED_CLASS = 'disabled';

  @Input() currentCooldown = 0;

  constructor(@Attribute('cooldown-time') public cooldownTime: string,
    @Attribute('onErrorSrc') public onErrorSrc: string,
    private el: ElementRef) {
  }

  @HostListener('load') onLoad() {
    this.animateSkillCooldown();
  }

  @HostListener('error') onError() {
  }

  private animateSkillCooldown() {
    const targetSkillElement = this.el.nativeElement;

    if (!targetSkillElement.classList.contains(this.SKILL_CLASS)) {return;}

    const originalSkillCooldown = getCooldownBySkillId(targetSkillElement.dataset.skillId);
    if (originalSkillCooldown !== parseInt(targetSkillElement.dataset.cooldownTime)) {
      // targetSkillElement.classList.remove("animate__animated", "animate__flash");
      targetSkillElement.classList.add(this.DISABLED_CLASS);

      const passedTime = parseInt(targetSkillElement.dataset.cooldownTime) / originalSkillCooldown * 100;
      targetSkillElement.style.filter = `grayscale(${passedTime})`;
      return;
    }
      // targetSkillElement.classList.remove("animate__animated", "animate__flash");

    if (originalSkillCooldown === parseInt(targetSkillElement.dataset.cooldownTime)) {
      targetSkillElement.style = '';
      targetSkillElement.classList.remove(this.DISABLED_CLASS);
      // targetSkillElement.classList.add("animate__animated", "animate__flash");
      // setInterval(() => {
      //   targetSkillElement.classList.remove("animate__animated", "animate__flash");
      // }, 1000);
      return;
    }

    // targetSkillElement.classList.remove("animate__animated", "animate__flash");

    // const passedTime = parseInt(targetSkillElement.dataset.cooldownTime) / originalSkillCooldown * 100;
    // targetSkillElement.style.filter = `grayscale(${passedTime})`;

    // grayscale(1) -> fully grayscaled
    // grayscale(0) -> regular color
    // if given a skill that has cooldown of 10
    // and we have it show as 9 in the cooldown-time attr element
    // then it should show near full grayscale
    // so 9/10 -> .9
    // 8/10 -> .8
    // we are slowly reaching 0 which means it available
    // to get the value inside grayscale, we should just calculate: current cooldown time / original time of skill cooldown
  }

  // private activateSkill = (event: any) => {
  //   const { target } = event;

  //   if (!target.classList.contains(this.SKILL_CLASS)) return;

  //   target.classList.remove("animate__animated", "animate__flash");
  //   target.classList.add(this.DISABLED_CLASS);

  //   const skillId = target.dataset.skillId;
  //   let time = getCooldownBySkillId(skillId) * this.SECOND_IN_MS - this.UPDATE_INTERVAL;

  //   const intervalID = setInterval(() => {
  //     const passedTime = time / (getCooldownBySkillId(skillId) * this.SECOND_IN_MS);
  //     target.style.filter = `grayscale(${passedTime})`;

  //     target.textContent = (time / this.SECOND_IN_MS).toFixed(2);
  //     time -= this.UPDATE_INTERVAL;

  //     if (time < 0) {
  //       target.textContent = '';
  //       target.style = '';
  //       target.classList.remove(this.DISABLED_CLASS);
  //       target.classList.add("animate__animated", "animate__flash");

  //       clearInterval(intervalID);
  //     }
  //   }, this.UPDATE_INTERVAL);
  // }
}
