import { Injectable } from '@angular/core';
import { Command } from '@tauri-apps/api/shell';
import { emit, listen } from '@tauri-apps/api/event';
import { CharacterFacadeService } from '../store/character-facade.service';
import { message } from '@tauri-apps/api/dialog';
import { CharacterItem, Skill } from '../models/character.model';
import { getCooldownBySkillName, getCooldownBySkillId } from '../utils/utils';

interface Payload {
  type: string;
  message: string;
}

enum MessageType {
  onInitEnv = 'onInitEnv',
  onNewPc = 'onNewPc',
  onSkillStart = 'onSkillStart'
}

@Injectable({
  providedIn: 'root'
})
export class HttpBridgeService {

  constructor(private facade: CharacterFacadeService) { }

  async setupListener() {
    await listen('message', (event) => {
      // console.log(event); 
      const parsed = JSON.parse((event.payload as string).slice(1, -1));
      this.parseLog(parsed);
    });
  }

  private parseLog(eventPayload: Payload) {
    const [messageType, messageContent] = eventPayload.message.split(':');
    switch (messageType) {
      case MessageType.onInitEnv: 
        console.log('onInitEnv');
        this.resetState();
        break;
      case MessageType.onNewPc:
        console.log('onNewPc');
        this.createNewCharacter(messageContent);
        break;
      case MessageType.onSkillStart:
        console.log('onSkillStart');
        this.addSkillToCharacter(messageContent);
        break;
      default:
        break;
    } 
  }

  private createNewCharacter(messageContent: string) {
    const [logId, characterName, classId, className, gearScore, currentHp, maxHp] = messageContent.split(',').map((content) => content.trim());

    const characterToAdd: CharacterItem = {
      name: characterName,
      classId: classId, 
      className,
      skills: Array(10).fill({ name: 'unknown', skillId: 'unknown'})
    };

    this.facade.addCharacter(characterToAdd);
  }

  private addSkillToCharacter(messageContent: string) {
    //onSkillStart: 4AE04E7D, You, 22120, Wind's Whisper"
    const [logId, characterName, skillId, skillName] = messageContent.split(',').map((content) => content.trim());
    console.log({logId, characterName, skillId, skillName})
    const skillToAdd: Skill = {
      name: skillName,
      id: skillId,
      cooldown: getCooldownBySkillId(skillId)
    }
    // console.log(skillToAdd);
    this.facade.addSkillToCharacter(skillToAdd, characterName);
  }

  private resetState() {
    this.facade.resetState();
  }

}
