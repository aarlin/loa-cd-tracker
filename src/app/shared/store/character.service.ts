import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, interval } from 'rxjs';
import { escapeSkills } from '../../../constants/escapeSkills';
import { skills } from '../../../constants/skills';
import { CharacterItem, CharacterStoreState, Skill } from '../models/character.model';
import { getClassBySkillId, getCooldownBySkillId, populateInitialCharacterSkills } from '../utils/utils';

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
      const state = this.getState();
      if (state.characters) {
        const updatedCharacterSkillState = state.characters.map((character) => ({
            ...character,
            skills: character.skills.map((skill) => {
              if (skill && skill.cooldown && skill.cooldown > 0 && skill.isOnCooldown) {
                const updatedSkill = { ...skill, cooldown: skill.cooldown - 1 };
                return updatedSkill;
              } else {
                const resetSkillCooldown = { ...skill, cooldown: getCooldownBySkillId(skill.id ?? '123'), isOnCooldown: false };
                return resetSkillCooldown;
              }
            })
          }));
        this.setState({ characters: updatedCharacterSkillState }, 'UPDATE_INTERVAL_STATE');
      }
    });
  }

  // setIntervalStateChange() {
  //   setInterval(() => {
  //     let state = this.getState();
  //     if (state.characters.length) {
  //       const updatedCharacterSkillState = state.characters.map((character) => {
  //         const updatedCharacter = {
  //           ...character,
  //           skills: character.skills.map((skill) => {
  //             if (skill && skill.cooldown && skill.cooldown > 0) {
  //               const updatedSkill = { ...skill, cooldown: skill.cooldown - 1 };
  //               return updatedSkill;
  //             }
  //             return skill;
  //           })
  //         }
  //         return updatedCharacter;
  //       });
  //       this.setState({ characters: updatedCharacterSkillState }, 'UPDATE_INTERVAL_STATE');
  //     }
  //   }, 1000);
  // }


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
    const state = this.getState();
    state.characters.push(character);
    this.setState({ characters: state.characters }, 'ADD_CHARACTER');
  }

  removeRow(id: any) {
    console.log('remove', id);
    const state = this.getState();
    state.characters.splice(id, 1);
    this.setState({ characters: state.characters }, 'REMOVE_CHARACTER_ID');
  }

  addSkillToCharacter(skill: Skill, characterName: string) {
    const state = this.getState();
    const character = state.characters.find(character => character.name === characterName);

    // TODO: if auto attack, ignore


    if (!character) {
      const className = getClassBySkillId(skill.id ?? '123');
      const indexOfEscapeSkills = escapeSkills[className].findIndex((escapeSkill: any) => escapeSkill.name === skill.name) >= 0;
      if (skill?.name && indexOfEscapeSkills) {
        // TODO: set isOnCooldown on skill inside here as true
        const character: CharacterItem = {
          className,
          name: characterName,
          skills: populateInitialCharacterSkills(className)
        };
        this.add(character);
      } else {
        const character: CharacterItem = {
          className,
          name: characterName,
          skills: [...escapeSkills[className], skill, ...Array(7).fill({ name: 'unknown', id: 'unknown' })]
        };
        this.add(character);
      }
    } else if (character && !character.skills.find(characterSkill => characterSkill.name === skill.name)) {
      this.addNewSkill(skill, character);
      const characterToReplace = state.characters.find(character => character.name === characterName);
      if (characterToReplace) {
        Object.assign(characterToReplace, character);
      }
      this.setState({ characters: state.characters }, 'ADD_SKILL_TO_CHARACTER');
    } else if (character && character.skills.find(characterSkill => characterSkill.name === skill.name)) {
      const updatedCharacterSkills = character.skills.map(characterSkill => {
        if (characterSkill.name === skill.name) {
          return { ...characterSkill, isOnCooldown: true };
        }
        return characterSkill;
      });
      const characterToReplace = state.characters.find(character => character.name === characterName);
      if (characterToReplace) {
        characterToReplace.skills = updatedCharacterSkills;
        Object.assign(characterToReplace, character);
      }
      this.setState({ characters: state.characters }, 'SKILL_USED');
    }
  }

  addNewSkill(addedSkill: Skill, character: CharacterItem): void {
    const unknownSkillIndex = character?.skills.findIndex(skill => skill.name === 'unknown');
    if (unknownSkillIndex >= 0) {
      character?.skills.splice(unknownSkillIndex, 1);
    }
    character?.skills.push(addedSkill);
  }

  resetState() {
    const initialState: CharacterStoreState = {
      characters: [],
      length: 0,
    };
    this.setState(initialState, 'INIT_STATE');
  }
}
