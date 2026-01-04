import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPainelComponent } from './admin-painel/admin-painel.component';

const routes: Routes = [
  { path: '', component: AdminPainelComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPainelRoutingModule { }
