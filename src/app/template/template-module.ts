import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing-module';
import { Layout } from './layout/layout';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';


@NgModule({
  declarations: [
    Layout,
    AcessoNegadoComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
  ]
})
export class TemplateModule { }
