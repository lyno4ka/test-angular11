import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTableRoutingModule } from './user-table-routing.module';
import {UserTableComponent} from './user-table.component';
import {MaterialModule} from '@app/modules/material.module';


@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    UserTableRoutingModule,
    MaterialModule
  ]
})
export class UserTableModule { }
