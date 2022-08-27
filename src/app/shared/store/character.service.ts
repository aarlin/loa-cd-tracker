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
    const character = state.characters.find(character => character.name === characterName);
    if (character && !character?.skills.find(characterSkill => characterSkill.name === skill.name)) {
      character?.skills.push(skill);
      this.setState({ characters: [...state.characters, character] }, 'ADD_SKILL_TO_CHARACTER');
    }

  }
}