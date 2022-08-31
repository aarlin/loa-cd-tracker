import { Attribute, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { getCooldownBySkillId } from '../../utils/utils';

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

    if (!targetSkillElement.classList.contains(this.SKILL_CLASS)) { return; }

    const originalSkillCooldown = getCooldownBySkillId(targetSkillElement.dataset.skillId);
    if (originalSkillCooldown !== parseInt(targetSkillElement.dataset.cooldownTime)) {
      targetSkillElement.classList.add(this.DISABLED_CLASS);

      const passedTime = parseInt(targetSkillElement.dataset.cooldownTime) / originalSkillCooldown * 100;
      targetSkillElement.style.filter = `grayscale(${passedTime})`;
      return;
    }

    if (originalSkillCooldown === parseInt(targetSkillElement.dataset.cooldownTime)) {
      targetSkillElement.style = '';
      targetSkillElement.classList.remove(this.DISABLED_CLASS);
      return;
    }
  }
}
