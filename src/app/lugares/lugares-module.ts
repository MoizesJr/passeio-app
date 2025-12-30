import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LugaresRoutingModule } from './lugares-routing-module';
import { LugarComponent } from './lugar/lugar.component';



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    LugaresRoutingModule,
    ReactiveFormsModule,
    LugarComponent,
  ]
})
export class LugaresModule { }
