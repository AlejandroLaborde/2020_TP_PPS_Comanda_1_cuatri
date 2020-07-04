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
  {
    path: 'metre',
    loadChildren: () => import('./pages/metre/metre.module').then( m => m.MetrePageModule)
  },
  {
    path: 'mi-pedido',
    loadChildren: () => import('./pages/mi-pedido/mi-pedido.module').then( m => m.MiPedidoPageModule)
  },
  {
    path: 'cocinero',
    loadChildren: () => import('./pages/cocinero/cocinero.module').then( m => m.CocineroPageModule)
  },
  {
    path: 'bartender',
    loadChildren: () => import('./pages/bartender/bartender.module').then( m => m.BartenderPageModule)
  },
  {
    path: 'mozo',
    loadChildren: () => import('./pages/mozo/mozo.module').then( m => m.MozoPageModule)
  },
  {
    path: 'cuenta-cliente',
    loadChildren: () => import('./pages/cuenta-cliente/cuenta-cliente.module').then( m => m.CuentaClientePageModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./pages/encuesta/encuesta.module').then( m => m.EncuestaPageModule)
  },
    
  {
    path: 'opciones-cliente',
    loadChildren: () => import('./pages/opciones-cliente/opciones-cliente.module').then( m => m.OpcionesClientePageModule)
  },
    
  {  path: '',    redirectTo: 'login',    pathMatch: 'full'  }
    




  




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
