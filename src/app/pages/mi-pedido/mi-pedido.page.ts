import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { DetalleProductoComponent } from 'src/app/components/detalle-producto/detalle-producto.component';
import { PopoverController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  pedido:Pedido;
  tiempoMaximo:number=0;
  constructor( private route:ActivatedRoute,
               private pedidosService:PedidoService,
               private popoverCtrl: PopoverController,
               private router:Router ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.tiempoMaximo = 0;
      this.pedidosService.obtenerPedido(params.id).subscribe( (resp:Pedido)=>{
        this.pedido=resp;
        this.pedido.id= params.id;
        resp.productos.forEach( (prod:Producto)=>{
          if(prod.tiempoPreparacion>this.tiempoMaximo){
            this.tiempoMaximo = prod.tiempoPreparacion;
          }
        })
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

  pedirCuenta(){
    this.router.navigate(['/cuenta-cliente',{id:this.pedido.id}]);
  }

}
