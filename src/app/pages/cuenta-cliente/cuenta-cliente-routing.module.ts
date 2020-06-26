import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaClientePage } from './cuenta-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaClientePageRoutingModule {}
