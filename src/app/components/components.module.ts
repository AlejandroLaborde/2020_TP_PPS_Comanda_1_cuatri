import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectorQRComponent } from './lector-qr/lector-qr.component';




@NgModule({
  declarations: [
    LectorQRComponent
  ],
  exports:[
    LectorQRComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
