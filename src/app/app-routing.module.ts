import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) },
  {  path: 'login',  loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)  },
  {  path: 'registro', loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)  },
  {  path: '',    redirectTo: 'login',    pathMatch: 'full'  },  {
    path: 'supervisor',
    loadChildren: () => import('./pages/supervisor/supervisor.module').then( m => m.SupervisorPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
