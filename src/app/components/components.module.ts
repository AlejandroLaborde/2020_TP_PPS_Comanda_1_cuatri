import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectorQRComponent } from './lector-qr/lector-qr.component';
import { LectorDniComponent } from './lector-dni/lector-dni.component';
import { ListaProductosComponent } from './confirmar-productos-pedido/lista-productos.component';
import { IonicModule } from '@ionic/angular';
import { ConsultaMozoComponent } from './consulta-mozo/consulta-mozo.component';
import { FormsModule } from '@angular/forms';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    LectorQRComponent,
    LectorDniComponent,
    ListaProductosComponent,
    ConsultaMozoComponent,
    DetalleProductoComponent
  ],
  exports:[
    LectorQRComponent,
    LectorDniComponent,
    ListaProductosComponent,
    ConsultaMozoComponent,
    DetalleProductoComponent
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
