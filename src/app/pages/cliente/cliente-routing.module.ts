import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';
import { MiPedidoPage } from '../mi-pedido/mi-pedido.page';

const routes: Routes = [
  { path: '', component: ClientePage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
