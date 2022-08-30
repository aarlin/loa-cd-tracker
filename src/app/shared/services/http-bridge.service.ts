import { Injectable } from '@angular/core';
import { listen } from '@tauri-apps/api/event';
import { CharacterFacadeService } from '../store/character-facade.service';
import { message } from '@tauri-apps/api/dialog';
import { CharacterItem, Skill } from '../models/character.model';
import { getCooldownBySkillName, getCooldownBySkillId, populateInitialCharacterSkills } from '../utils/utils';

interface Payload {
  type: string;
  message: string;
}

enum MessageType {
  ON_INIT_ENV = 'onInitEnv',
  ON_NEW_PC = 'onNewPc',
  ON_SKILL_START = 'onSkillStart',
  ON_BUFF = 'onBuff'
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
      case MessageType.ON_INIT_ENV:
        console.log('onInitEnv');
        this.resetState();
        break;
      case MessageType.ON_NEW_PC:
        console.log('onNewPc');
        this.createNewCharacter(messageContent);
        break;
      case MessageType.ON_SKILL_START:
        console.log('onSkillStart');
        this.addSkillToCharacter(messageContent);
        break;
      case MessageType.ON_BUFF:
        console.log('onBuff');
        this.trackBuff(messageContent);
        break;
      default:
        break;
    }
  }

  private createNewCharacter(messageContent: string) {
    const [logId, characterName, classId, className, gearScore, currentHp, maxHp] = messageContent.split(',').map((content) => content.trim());

    const characterToAdd: CharacterItem = {
      name: characterName,
      classId,
      className,
      skills: populateInitialCharacterSkills(className)
    };

    this.facade.addCharacter(characterToAdd);
  }

  private addSkillToCharacter(messageContent: string) {
    //onSkillStart: 4AE04E7D, You, 22120, Wind's Whisper"
    const [logId, characterName, skillId, skillName] = messageContent.split(',').map((content) => content.trim());
    console.log({logId, characterName, skillId, skillName});
    const skillToAdd: Skill = {
      name: skillName,
      id: skillId,
      cooldown: getCooldownBySkillId(skillId),
      isAvailableToUse: false
    };
    // console.log(skillToAdd);
    this.facade.addSkillToCharacter(skillToAdd, characterName);
  }

  private trackBuff(messageContent: string) {
    const [logId, characterName, buffId, buffName, sourceId, sourceName, shieldAmount] = messageContent.split(',').map((content) => content.trim());
    console.log({ logId, characterName, buffId, buffName, sourceId, sourceName, shieldAmount});

    // TODO: call facade to track buff
  }

  private resetState() {
    this.facade.resetState();
  }

}
