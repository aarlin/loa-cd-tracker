import { Injectable } from '@angular/core';
import { Command } from '@tauri-apps/api/shell';
import { emit, listen } from '@tauri-apps/api/event';
import { CharactersRepository } from '../store/session.store';


@Injectable({
  providedIn: 'root'
})
export class HttpBridgeService {

  constructor(private sessionStore: CharactersRepository) { }

  async setupListener() {
    const unlisten = await listen('message', (event) => {
      const parsed = JSON.parse((event.payload as string).slice(1, -1))
      console.log(parsed);
    });
  }

  parse

}
