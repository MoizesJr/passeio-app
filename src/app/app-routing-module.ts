import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landingpage } from './landingpage/landingpage';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: Landingpage
  },
  {
    path: 'paginas',
    canActivate: [authGuard],
    loadChildren: () => import('./template/template-module').then(m => m.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
