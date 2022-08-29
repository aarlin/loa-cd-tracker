import { Attribute, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { getCooldownBySkillId, getCooldownBySkillName } from '../../utils/utils';

@Directive({
  selector: '[cooldown]'
})
export class CooldownDirective {
  SECOND_IN_MS = 1000;
  UPDATE_INTERVAL = this.SECOND_IN_MS / 60; // Update 60 times per second (60 FPS)
  SKILL_CLASS = 'skill';
  DISABLED_CLASS = 'disabled';

  @Input() currentCooldown: number = 0;

  constructor(@Attribute('cooldown-time') public loader: string,
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

    if (!targetSkillElement.classList.contains(this.SKILL_CLASS)) return;

    const skillAvailable = targetSkillElement.dataset.skillAvailable;

    if (skillAvailable === "true") return;

    targetSkillElement.classList.remove("animate__animated", "animate__flash");
    targetSkillElement.classList.add(this.DISABLED_CLASS);

    const skillId = targetSkillElement.dataset.skillId;

    const originalSkillCooldown = getCooldownBySkillId(skillId);

    const passedTime = parseInt(targetSkillElement.dataset.cooldownTime) / originalSkillCooldown * 100
    targetSkillElement.style.filter = `grayscale(${passedTime})`;

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

  private activateSkill = (event: any) => {
    const { target } = event;

    // Exit if we click on anything that isn't a skill
    if (!target.classList.contains(this.SKILL_CLASS)) return;

    target.classList.remove("animate__animated", "animate__flash");
    target.classList.add(this.DISABLED_CLASS);

    // Get cooldown time
    const skillId = target.dataset.skillId;
    let time = getCooldownBySkillId(skillId) * this.SECOND_IN_MS - this.UPDATE_INTERVAL;

    // Update remaining cooldown
    const intervalID = setInterval(() => {
      // Pass remaining time in percentage to CSS
      const passedTime = time / (getCooldownBySkillId(skillId) * this.SECOND_IN_MS);
      target.style.filter = `grayscale(${passedTime})`;

      // Display time left
      target.textContent = (time / this.SECOND_IN_MS).toFixed(2);
      time -= this.UPDATE_INTERVAL;

      // Stop timer when there is no time left
      if (time < 0) {
        target.textContent = '';
        target.style = '';
        target.classList.remove(this.DISABLED_CLASS);
        target.classList.add("animate__animated", "animate__flash");

        clearInterval(intervalID);
      }
    }, this.UPDATE_INTERVAL);
  }
}
