import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { estadoPedido, tipoProducto, estadoProducto } from 'src/app/models/tipos';
import { Producto } from 'src/app/models/producto';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.page.html',
  styleUrls: ['./cocinero.page.scss'],
})
export class CocineroPage implements OnInit {

  pedidos = [];
  pedidosListos = [];
  terminado = false;
  noHayPedidos = false;
  productos = [];
  listo = true;
  idActivo = '';
  cantPed = 100000;

  constructor(private pedidoService: PedidoService, private toast: ToastService,
     private httpClient:HttpClient) { }

  ngOnInit() {

    this.pedidoService.obtenerPedidos().snapshotChanges().forEach( clientesSnapshot => {
      this.pedidos = [];
      clientesSnapshot.forEach( snapshot => {
        const pedido = snapshot.payload.toJSON() as Pedido;
        if(pedido.estado == estadoPedido.espera || pedido.estado == estadoPedido.preparandose){
            pedido.idBD = snapshot.payload.key;
            this.pedidos.push(pedido);
            this.noHayPedidos = false;
            this.terminado = false;
        }
        if(this.pedidos.length == 0){
          this.noHayPedidos = true;
        }
      });
      if ( this.pedidos.length > this.cantPed ) {
        Swal.fire({
          icon: 'info',
          title: 'Pedidos',
          text: 'Ingreso un nuevo pedido!',
        });
      }
      this.cantPed = this.pedidos.length;
    });
  }


detallesPedido(pedido:Pedido){

  if(this.idActivo == ''){
    
    this.pedidoService.obtenerPedido(pedido.idBD).subscribe( (ped:Pedido)=>{
      this.productos = [];
      ped.productos.forEach( (prod:Producto)=>{
        if(prod.tipo == tipoProducto.comida && prod.estado != estadoProducto.listo){
          prod.idBD = ped.productos.indexOf(prod);
          this.productos.push(prod);
          this.terminado = false;
        }
        if(this.productos.length == 0){
          this.terminado = true;
        }
      });
    });
    this.idActivo = pedido.idBD;
    this.productos = [];
  }else{

    this.idActivo = '';

  }
}

prepararComida(producto:Producto, pedido:Pedido){
  if (pedido.estado == estadoPedido.preparandose) {
    this.cambiarEnBD(producto, pedido).subscribe(res => {
      this.productos = [];
    });
  }else{
      this.httpClient.patch(`${environment.hostFirebase}/pedidos/${this.idActivo}.json`,
        {estado:estadoPedido.preparandose}).subscribe( res =>{
          this.cambiarEnBD(producto, pedido).subscribe(res => {
          this.productos = [];
          
          });
        
      });
    
  }

}

cambiarEnBD(prod:Producto, ped:Pedido){

  if(prod.estado == estadoProducto.pendiente){
    return this.httpClient.patch(`${environment.hostFirebase}/pedidos/${ped.idBD}/productos/${prod.idBD}.json`,
        {estado:estadoProducto.preparandose});
  }
  if(prod.estado == estadoProducto.preparandose){
    return this.httpClient.patch(`${environment.hostFirebase}/pedidos/${ped.idBD}/productos/${prod.idBD}.json`,
        {estado:estadoProducto.listo});
  }
        
}

comidaLista(producto:Producto, pedido:Pedido){
  this.cambiarEnBD(producto, pedido).subscribe( res =>{
    this.productos = [];
    this.pedidoService.obtenerPedido(pedido.idBD).subscribe( (ped:Pedido)=>{
      if(ped.estado == estadoPedido.preparandose){
        this.listo = true;
        ped.productos.forEach( (prod:Producto)=>{
          if (prod.estado != estadoProducto.listo) {
            this.listo = false;
          }
        });
        if (this.listo) {
          this.httpClient.patch(`${environment.hostFirebase}/pedidos/${pedido.idBD}.json`,
            {estado:estadoPedido.listo}).subscribe( res=>{
              this.toast.confirmationToast('Pedido listo para servir!');

            });
        }
      }
      
    });
  });

}

/*
 */













}
