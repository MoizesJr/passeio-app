import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { adminGuard } from '../admin.guard';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { AdminPainelComponent } from '../components/admin-painel/admin-painel.component';
import { authGuard } from '../guards/auth-guard';
import { DicasComponent } from '../paginas/dicas/dicas.component';
import { DepoimentosComponent } from '../paginas/depoimentos/depoimentos.component';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      // Módulo de Galeria (Legacy/Module based)
      {
        path: 'galeria',
        canActivate: [authGuard],
        loadChildren: () => import('../galeria/galeria-module').then(m => m.GaleriaModule),
        pathMatch: 'full',
        data: { titulo: 'Galeria de lugares', subTitulo: 'Descubra os melhores destinos' }
      },
      // Páginas Standalone
      { 
        path: 'dicas', 
        component: DicasComponent, 
        data: { titulo: 'Dicas de Viagem', subTitulo: 'Tudo o que você precisa saber' } 
      },
      { 
        path: 'depoimentos', 
        component: DepoimentosComponent,
        data: { titulo: 'Depoimentos', subTitulo: 'O que nossos clientes dizem' } 
      },
      // Módulo Administrativo
      { 
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () => import('../components/admin-painel-module').then(m => m.AdminPainelModule),
        data: { titulo: 'Administração', subTitulo: 'Painel de Controle do Sistema' }
      },
      // Tratamento de Erros e Permissões
      {
        path: 'acesso-negado',
        component: AcessoNegadoComponent,
        data: { titulo: 'Área Restrita', subTitulo: 'Você não tem permissão para acessar esta página' }
      },
      //desabilitados, foram implementados no painel admin
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
