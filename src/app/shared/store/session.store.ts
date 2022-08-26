import { Injectable } from '@angular/core';
import { createState, propsArrayFactory, Store } from '@ngneat/elf';
import {
  selectEntities,
  setEntities,
  selectAllEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { withLatestFrom, map } from 'rxjs';

export interface Character {
  id: string;
  name: string;
  skills: Skill[]
}

interface Skill {
    name: string;
    cooldown: string;
    isTransformationSkill?: boolean;
}

const {
  withCharacterIds,
  selectCharacterIds,
  addCharacterIds,
  removeCharacterIds,
  resetCharacterIds,
  inCharacterIds,
} = propsArrayFactory('characterIds', { initialValue: [] as string[] });

const { state, config } = createState(withEntities<Character>(), withCharacterIds());

const store = new Store({ name: 'characters', state, config });

@Injectable({ providedIn: 'root' })
export class CharactersRepository {
  characters$ = store.pipe(selectAllEntities());

  charactersId$ = store.pipe(selectAllEntities())

  setCharacters(characters: Character[]) {
    store.update(setEntities(characters));
  }

  removeFromCollection(characterId: string) {
    store.update(removeCharacterIds(characterId));
  }

  addToCollection(characterId: string) {
    if (!store.query(inCharacterIds(characterId))) {
      store.update(addCharacterIds(characterId));
    }
  }

  removeAllFromCollection() {
    store.update(removeCharacterIds(this.characters$.map((character: Character) => character.id)))
  }
}