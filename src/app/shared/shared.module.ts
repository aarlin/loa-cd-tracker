import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { CooldownDirective } from './directives/cooldown/cooldown.directive';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, CooldownDirective],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, CooldownDirective, FormsModule]
})
export class SharedModule {}
