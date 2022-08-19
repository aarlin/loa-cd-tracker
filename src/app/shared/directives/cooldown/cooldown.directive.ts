import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[cooldown]'
})
export class CooldownDirective {
  SECOND_IN_MS = 1000;
  UPDATE_INTERVAL = this.SECOND_IN_MS / 60; // Update 60 times per second (60 FPS)
  SKILL_CLASS = 'skill';
  DISABLED_CLASS = 'disabled';
  
  // Cooldowns per skill in milliseconds
  COOLDOWN_MAP = new Map([
    ['Moon Flash Kick', 22000],
    ['Energy Combustion', 36000],
    ['Lightning Kick', 9000],
    ['Charging Steps', 6000],
    ['tumble', 5000],
  ]);


  constructor(private el: ElementRef) {
    console.log(this.el.nativeElement.src);
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    console.log(e);
    this.activateSkill(e);
  }

  private activateSkill = (event: any) => {
    const {target} = event;
    
    // Exit if we click on anything that isn't a skill
    if(!target.classList.contains(this.SKILL_CLASS)) return;
    
    target.classList.remove("animate__animated", "animate__flash");
    target.classList.add(this.DISABLED_CLASS);
    
    // Get cooldown time
    const skill = target.dataset.skill;
    let time = this.COOLDOWN_MAP.get(skill) ?? 0 - this.UPDATE_INTERVAL;
    
    // Update remaining cooldown
    const intervalID = setInterval(() => {
      // Pass remaining time in percentage to CSS
      const passedTime = time / (this.COOLDOWN_MAP.get(skill) ?? 0);
      target.style.filter = `grayscale(${passedTime})`;
      
      // Display time left
      target.textContent = (time / this.SECOND_IN_MS).toFixed(2);
      time -= this.UPDATE_INTERVAL;
      
      // Stop timer when there is no time left
      if(time < 0) {
        target.textContent = '';
        target.style = '';
        target.classList.remove(this.DISABLED_CLASS);
        target.classList.add("animate__animated", "animate__flash");
        
        clearInterval(intervalID);
      }
    }, this.UPDATE_INTERVAL);
  }
}
