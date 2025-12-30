import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing-module';
import { CategoriaComponent } from './categoria/categoria.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    CategoriaComponent,
  ]
})
export class CategoriasModule { }
