import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) },
  {  path: 'login',  loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)  },
  {  path: 'registro', loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)  },
  {
    path: 'supervisor',
    loadChildren: () => import('./pages/supervisor/supervisor.module').then( m => m.SupervisorPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'alta-pedido',
    loadChildren: () => import('./pages/alta-pedido/alta-pedido.module').then( m => m.AltaPedidoPageModule)
  },
  {  path: '',    redirectTo: 'login',    pathMatch: 'full'  },
  {
    path: 'metre',
    loadChildren: () => import('./pages/metre/metre.module').then( m => m.MetrePageModule)
  }, 




  




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
