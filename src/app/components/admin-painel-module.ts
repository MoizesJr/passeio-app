import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPainelRoutingModule } from './admin-painel-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPainelComponent } from './admin-painel/admin-painel.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminPainelRoutingModule,
    AdminPainelComponent
  ]
})
export class AdminPainelModule { }
