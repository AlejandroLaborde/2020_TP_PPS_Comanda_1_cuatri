import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectorQRComponent } from './lector-qr/lector-qr.component';
import { LectorDniComponent } from './lector-dni/lector-dni.component';
import { ListaProductosComponent } from './confirmar-productos-pedido/lista-productos.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    LectorQRComponent,
    LectorDniComponent,
    ListaProductosComponent
  ],
  exports:[
    LectorQRComponent,
    LectorDniComponent,
    ListaProductosComponent
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule
  ]
})
export class ComponentsModule { }
