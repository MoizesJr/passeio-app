import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { adminGuard } from '../admin.guard';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { AdminPainelComponent } from '../components/admin-painel/admin-painel.component';
import { authGuard } from '../guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
     /* {
        path: 'categorias',
        canActivate: [adminGuard],
        loadChildren: () => import('../categorias/categorias-module').then(m => m.CategoriasModule),
        pathMatch: 'full',
        data: { titulo: 'Categorias', subTitulo: 'Realize o cadastro de novas categorias' }
      },
      {
        path: 'lugares',
        canActivate: [adminGuard],
        loadChildren: () => import('../lugares/lugares-module').then(m => m.LugaresModule),
        pathMatch: 'full',
        data: { titulo: 'Lugares', subTitulo: 'Realize o cadastro de novos lugares' }
      },*/
      {
        path: 'galeria',
        canActivate: [authGuard],
        loadChildren: () => import('../galeria/galeria-module').then(m => m.GaleriaModule),
        pathMatch: 'full',
        data: { titulo: 'Lista de lugares legais', subTitulo: 'Descubra os melhores lugares para se divertir' }
      },
  
      {
        path: 'acesso-negado',
        component: AcessoNegadoComponent,
        data: { titulo: 'Área Restrita', subTitulo: 'Ocorreu um problema de permissão' }
      },
      { 
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () => import('../components/admin-painel-module').then(m => m.AdminPainelModule),
        data: { titulo: 'Administração', subTitulo: 'Área de administração do sistema' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
