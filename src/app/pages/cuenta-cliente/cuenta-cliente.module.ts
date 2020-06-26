import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaClientePageRoutingModule } from './cuenta-cliente-routing.module';

import { CuentaClientePage } from './cuenta-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaClientePageRoutingModule
  ],
  declarations: [CuentaClientePage]
})
export class CuentaClientePageModule {}
