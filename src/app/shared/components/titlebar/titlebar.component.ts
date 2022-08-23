import { Component, OnInit } from '@angular/core';
import { appWindow } from '@tauri-apps/api/window'

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public minimize() {
    appWindow.minimize();
  }

  public maximize() {
    appWindow.toggleMaximize();
  }

  public close() {
    appWindow.close();
  }

}
