import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { ToastService } from 'src/app/services/toast.service';
import { Pedido } from 'src/app/models/pedido';
import { estadoPedido } from 'src/app/models/tipos';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.page.html',
  styleUrls: ['./bartender.page.scss'],
})
export class BartenderPage implements OnInit {

  pedidos = []; 

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


  prepararBebidas(pedido){

    this.toast.confirmationToast('Preparando!!');

  }















}
