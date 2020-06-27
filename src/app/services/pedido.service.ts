import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';
import { estadoPedido, estadoProducto, tipoProducto } from '../models/tipos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedidos: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private httpClient: HttpClient) {
    this.pedidos = firebase.list('pedidos');
    
  }

  altaPedido(pedido:Pedido){
    return this.httpClient.post(`${environment.hostFirebase}/pedidos.json`,pedido);
  }

  altaPropina(idPedido:string, productos:Producto[]){
    return this.httpClient.patch(`${environment.hostFirebase}/pedidos/${idPedido}.json`,{productos:productos});
  }

  altaProductos( idPedido:string, productos:Producto[] ){
    return this.httpClient.patch(`${environment.hostFirebase}/pedidos/${idPedido}.json`,{estado:estadoPedido.inicial,productos:productos});
  }

  cambiaEstadoPedido( idPedido:string, estadoPedido: estadoPedido ){
    return this.httpClient.patch(`${environment.hostFirebase}/pedidos/${idPedido}.json`,{estado:estadoPedido});
  }

  obtenerPedidos(){
    return this.firebase.list(`pedidos`);
  }

  obtenerPedido( idPedido ){
    return this.firebase.object(`pedidos/${idPedido}`).valueChanges();
  }

  obtenerPedidoPorIDCliente( idCliente){
    return this.firebase.object('pedidos').valueChanges().pipe(map(resp=>{return this.filtraXcliente(resp,idCliente)}));
  }
  
  calculaPrecio(productos:Producto[]){
    let precio=0;
    productos.forEach(element => {
      precio+=element.precio;
    });
    return precio;
  }

  filtraXcliente( lista, idCliente ){
    let pedido;
    let pedidos = this.objecToArray(lista);
    pedidos.forEach(element => {
      if(element.cliente.id == idCliente && element.estado!= estadoPedido.abonado){
        pedido = element;
      }
    });
    return pedido;
  }

  updatePedido( pedido ) {
    return this.httpClient.put(`${environment.hostFirebase}/pedidos/${pedido.id}.json`, pedido);
  }

  private objecToArray( datos: Object ){
    const peididos = [];
    if(datos == null) return [];
    Object.keys( datos ).forEach( key =>{
          let pedido: Pedido = datos[key];
          pedido.id=key;
          peididos.push(pedido);
    })
    return peididos;
  }

}
