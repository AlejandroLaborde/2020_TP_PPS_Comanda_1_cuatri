import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { estadoPedido } from 'src/app/models/tipos';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.page.html',
  styleUrls: ['./cocinero.page.scss'],
})
export class CocineroPage implements OnInit {

  pedidos = [];
  pedido: Pedido;

  constructor(private pedidoService: PedidoService, private toast: ToastService) { }

  ngOnInit() {

    this.pedidoService.obtenerPedidos().snapshotChanges().forEach( clientesSnapshot => {
      clientesSnapshot.forEach( snapshot => {
        const pedido = snapshot.payload.toJSON() as Pedido;
        if(pedido.estado == estadoPedido.espera){
            this.pedidos.push(pedido);
        }
      });
    });
  }


cocinarPedido(pedido){

  this.toast.confirmationToast('Preparando!!');

}
















}
