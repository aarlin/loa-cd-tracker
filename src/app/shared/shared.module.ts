import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { FormsModule } from '@angular/forms';
import { CooldownDirective } from './directives/cooldown/cooldown.directive';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { HttpBridgeService } from './services/http-bridge.service';
import { CharacterStoreService } from './store/character.service';

@NgModule({
  declarations: [PageNotFoundComponent, CooldownDirective, TitlebarComponent],
  providers: [HttpBridgeService, CharacterStoreService],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, CooldownDirective, FormsModule, TitlebarComponent]
})
export class SharedModule {}
