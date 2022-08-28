import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, interval } from 'rxjs';
import { skills } from '../../../constants/skills';
import { CharacterItem, CharacterStoreState, Skill } from '../models/character.model';
import { getCooldownBySkillId } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class CharacterStoreService extends ObservableStore<CharacterStoreState> {
  private intervalUpdater: any;

  constructor() {
    super({ trackStateHistory: true });
    this.setInitialState();
  }

  setInitialState() {
    const initialState: CharacterStoreState = {
      characters: [],
      length: 0,
    };
    this.setState(initialState, 'INIT_STATE');
    this.updateState();
    // this.setIntervalStateChange();
  }

  updateState() {
    this.intervalUpdater = interval(1000).subscribe(event => {
      let state = this.getState();
      if (state.characters) {
        const updatedCharacterSkillState = state.characters.map((character) => {
          return { 
            ...character,
            skills: character.skills.map((skill) => {
              if (skill && skill.cooldown && skill.cooldown > 0) {
                const updatedSkill = { ...skill, cooldown: skill.cooldown - 1 };
                return updatedSkill;
              } else {
                const resetSkillCooldown = { ... skill, cooldown: getCooldownBySkillId(skill.id ?? '123')}
                return resetSkillCooldown;
              }
            })
          }
        });
        console.log(updatedCharacterSkillState); // TODO: why doesnt this update the state? always the same 
        this.setState({ characters: updatedCharacterSkillState }, 'UPDATE_INTERVAL_STATE');
      }
    });
  }

  setIntervalStateChange() {
    setInterval(() => {
      let state = this.getState();
      if (state.characters.length) {
        const updatedCharacterSkillState = state.characters.map((character) => {
          const updatedCharacter = { 
            ...character,
            skills: character.skills.map((skill) => {
              if (skill && skill.cooldown && skill.cooldown > 0) {
                const updatedSkill = { ...skill, cooldown: skill.cooldown - 1 };
                return updatedSkill;
              }
              return skill;
            })
          }
          return updatedCharacter;
        });
        console.log(updatedCharacterSkillState); // TODO: why doesnt this update the state? always the same 
        this.setState({ characters: updatedCharacterSkillState }, 'UPDATE_INTERVAL_STATE');
      }
    }, 1000);
  }


  // One time action, no need to subscribe
  get() {
    const { characters } = this.getState();
    if (characters) {
      return of(characters);
    }
    // Here could be potentially API call
    return of(null);
  }

  add(character: CharacterItem) {
    let state = this.getState();
    state.characters.push(character);
    this.setState({ characters: state.characters }, 'ADD_CHARACTER');
  }

  removeRow(id: any) {
    console.log('remove', id);
    let state = this.getState();
    state.characters.splice(id, 1);
    this.setState({ characters: state.characters }, 'REMOVE_CHARACTER_ID');
  }

  addSkillToCharacter(skill: Skill, characterName: string) {
    let state = this.getState();
    let character = state.characters.find(character => character.name === characterName);
    // if (!character && characterName === 'You') {
    //   this.addSelf();
    // }
    if (!character) {
      const character: CharacterItem = {
        name: characterName,
        skills: [skill, ...Array(9).fill({ name: 'unknown', id: 'unknown'})]
      }
      this.add(character);
    } else if (character && !character?.skills.find(characterSkill => characterSkill.name === skill.name)) {
      this.addNewSkill(skill, character);
      const characterToReplace = state.characters.find(character => character.name === characterName);
      if (characterToReplace) {
        Object.assign(characterToReplace, character);
      }
      // console.log(state.characters, character, characterToReplace);
      this.setState({ characters: state.characters}, 'ADD_SKILL_TO_CHARACTER');
    }
  }
  
  addSelf() {
    const self: CharacterItem = {
      name: 'You',
      classId: '302',
      className: 'Wardancer',
      skills: Array(10).fill({ name: 'unknown', skill: 'unknown'}),
    }
    this.add(self);
  }

  addNewSkill(addedSkill: Skill, character: CharacterItem): void {
    const unknownSkillIndex = character?.skills.findIndex(skill => skill.name === 'unknown');
    console.log(unknownSkillIndex);
    if (unknownSkillIndex >= 0) {
      character?.skills.splice(unknownSkillIndex, 1);
    }
    character?.skills.unshift(addedSkill);
  }

  resetState() {
    const initialState: CharacterStoreState = {
      characters: [],
      length: 0,
    };
    this.setState(initialState, 'INIT_STATE');
  }
}