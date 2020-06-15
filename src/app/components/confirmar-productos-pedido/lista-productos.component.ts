import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
})
export class ListaProductosComponent implements OnInit {

  @Input() productos:Producto[];
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  confirmar(){
    this.popoverController.dismiss({confirma:true,productos:this.productos});
  }
  cancelar(){
    this.popoverController.dismiss({confirma:false});
  }
}
