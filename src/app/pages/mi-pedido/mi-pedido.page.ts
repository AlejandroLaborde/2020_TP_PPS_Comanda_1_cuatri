import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { DetalleProductoComponent } from 'src/app/components/detalle-producto/detalle-producto.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  pedido:Pedido;
  constructor( private route:ActivatedRoute,
               private pedidosService:PedidoService,
               private popoverCtrl: PopoverController ) {
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.pedidosService.obtenerPedido(params.id).subscribe( (resp:Pedido)=>{
        this.pedido=resp;
      })
    });
  }


  async mostrarDetalle( producto ) {
    const popover = await this.popoverCtrl.create({
      component: DetalleProductoComponent,
      componentProps:{producto:producto},
      translucent: true
    });
    return popover.present();  
    
  }

}
