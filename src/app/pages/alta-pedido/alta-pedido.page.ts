import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ToastService } from 'src/app/services/toast.service';
import { PopoverController } from '@ionic/angular';
import { ListaProductosComponent } from 'src/app/components/confirmar-productos-pedido/lista-productos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-alta-pedido',
  templateUrl: './alta-pedido.page.html',
  styleUrls: ['./alta-pedido.page.scss'],
})
export class AltaPedidoPage implements OnInit {

  precioTotal=0;
  productos=[];
  listaPedido=[];
  idPedido;
  paramsCliente;
  pedido:Pedido;
  constructor( private productosService:ProductoService,
               private toastService: ToastService,
               public popoverCtrl: PopoverController,
               private route: ActivatedRoute,
               private pedidosService:PedidoService,
               private router: Router
               ) {

    this.productosService.getProductos().then( resp=>{
      this.productos=resp;
    })
    this.route.params.subscribe(params => {
      this.paramsCliente=params.cliente;
      this.idPedido=params.pedido;
      this.pedidosService.obtenerPedido(params.pedido).subscribe((resp:Pedido)=>{
        if(resp){
          this.pedido=resp;
          if(resp.productos){
            this.listaPedido = resp.productos;
            this.precioTotal = this.pedidosService.calculaPrecio(resp.productos);
          }
        }
      });
    })
  }

  ngOnInit() {
  }

  agregaPorQR( data ){
    this.productos.forEach(element => {
      if(element.id==data.text){
        this.agregar(element);
      }
    });
  }

  
  agregar( producto:Producto ){
    this.listaPedido.push(producto);
    this.precioTotal+=producto.precio;
  }

  restar( producto:Producto){
    let indice=-1;
    for (let index = 0; index < this.listaPedido.length; index++) {
      if(this.listaPedido[index].id==producto.id){
        indice=index;
      }
    }
    if(indice!=-1){
      this.listaPedido.splice(indice,1);
      this.precioTotal-= producto.precio;
    }else{
      this.toastService.errorToast('este producto no se encuentra en la lista de pedidos');
    }
  }

  async verPedido() {
    if (this.listaPedido.length === 0) {
      this.toastService.errorToast('Debe cargar un producto al menos');
    } else {
      const popover = await this.popoverCtrl.create({
        component: ListaProductosComponent,
        componentProps:{productos:this.listaPedido},
        translucent: true
      });
      popover.present();
      return popover.onDidDismiss().then(
        (data: any) => {
          console.log(data);
          if (data.data.confirma) {
            this.pedidosService.altaProductos(this.idPedido,data.data.productos).subscribe(resp=>{
              this.toastService.confirmationToast('Su pedido ya fue solicitado');
              this.router.navigate(['/cliente',{cliente:this.paramsCliente}]);
            });
            
          }else{
            
          }
        })
    }
  }
}
