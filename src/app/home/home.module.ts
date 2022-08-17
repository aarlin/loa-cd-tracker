import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRootModule, TuiNotificationModule, TuiDialogModule, TuiAlertModule, TuiGroupModule } from '@taiga-ui/core';
import { TuiAvatarModule, TuiTagModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, 
    HomeRoutingModule, FormsModule, 
    ReactiveFormsModule, TuiRootModule, 
    TuiNotificationModule, TuiGroupModule,
    TuiDialogModule, TuiAvatarModule,
    TuiAlertModule, TuiTagModule]
})
export class HomeModule { }
