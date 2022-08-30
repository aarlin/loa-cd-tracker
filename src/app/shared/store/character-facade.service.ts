import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterItem, CharacterStoreState, Skill } from '../models/character.model';
import { CharacterStoreService } from './character.service';

@Injectable({ providedIn: 'root' })
export class CharacterFacadeService {
  // could be move to store as well, because
  // if you leave the component
  // the action stops and the item won't get removed
  timeOuts: { [key: number]: any } = {};

  constructor(private store: CharacterStoreService) {}

  addCharacter(character: CharacterItem) {
    this.store.add(character);
  }

  getCharacters(): Observable<CharacterStoreState> {
    return this.store.stateChanged;
  }

  removeCharacter(id: number) {
    this.store.removeRow(id);
  }

  addSkillToCharacter(skill: Skill, characterName: string) {
    this.store.addSkillToCharacter(skill, characterName);
  }

  resetState() {
    this.store.resetState();
  }
}
