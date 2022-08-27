import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of } from 'rxjs';
import { CharacterItem, CharacterStoreState, Skill } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class CharacterStoreService extends ObservableStore<CharacterStoreState> {
  constructor() {
    super({ trackStateHistory: true });
    const initialState: CharacterStoreState = {
      characters: [],
      length: 0,
    };
    this.setState(initialState, 'INIT_STATE');
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
    if (!character && characterName === 'You') {
      this.addSelf();
    }
    if (!character) {
      const character: CharacterItem = {
        name: characterName,
        skills: Array(10).fill({ name: 'unknown', id: 'unknown'})
      }
      this.add(character);
    }
    if (character && !character?.skills.find(characterSkill => characterSkill.name === skill.name)) {
      this.addNewSkill(skill, character);
      this.setState({ characters: [...state.characters, character] }, 'ADD_SKILL_TO_CHARACTER');
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