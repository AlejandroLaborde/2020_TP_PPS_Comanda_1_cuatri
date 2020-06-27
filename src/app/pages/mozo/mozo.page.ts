import { Component, OnInit } from '@angular/core';
import { MozoService } from 'src/app/services/mozo.service';
import { Consulta } from 'src/app/models/consulta';
import { estadoConsulta, estadoPedido } from 'src/app/models/tipos';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {

  consultas = [];
  pedidosPendientes = [];
  pedidosListos = [];
  cantListos = 100000;
  cantConsultas = 100000;
  pedidosAConfirmar = true;
  pedidosAEntregar: boolean;
  consultasClientes: boolean;
  secciones = [ { id: 0, descripcion: 'P. Pendientes'} , { id: 1, descripcion: 'P. Listos'}, {id: 2, descripcion: 'Consultas'} ];

  constructor(private mozoService: MozoService, private toastService: ToastService) { }

  ngOnInit() {
    this.obtenerConsultas();
    this.obtenerPedidos();
  }

  obtenerConsultas() {
    this.mozoService.obtenerConsultas().snapshotChanges().forEach( consultasSnapshot => {
      this.consultas = [];
      consultasSnapshot.forEach( snapshot => {
        const consulta = snapshot.payload.toJSON() as Consulta;
        if ( consulta.estado === estadoConsulta.pendiente ) {
            consulta.id = snapshot.payload.key;
            this.consultas.push(consulta);
        }
      });
      if ( this.consultas.length > this.cantConsultas ) {
        Swal.fire({
          icon: 'info',
          title: 'Consultas',
          text: 'Se realizó una nueva consulta',
        });
      }
      this.cantConsultas = this.consultas.length;
    });
  }

  obtenerPedidos() {
    this.mozoService.obtenerPedidos().snapshotChanges().forEach( pedidosSnapshot => {
      this.pedidosPendientes = [];
      this.pedidosListos = [];
      pedidosSnapshot.forEach( snapshot => {
        const pedido = snapshot.payload.toJSON() as Pedido;
        pedido.id = snapshot.payload.key;
        if ( pedido.estado === estadoPedido.inicial ) {
          this.pedidosPendientes.push(pedido);
        }
        if ( pedido.estado === estadoPedido.listo ) {
          this.pedidosListos.push(pedido);
        }
      });
      if(this.pedidosListos.length > this.cantListos){
        Swal.fire({
          icon: 'info',
          title: 'Pedidos',
          text: 'Hay un pedido listo para entregar!',
        });
      }
      this.cantListos = this.pedidosListos.length;
    });
  }

  cambioDeSeccion( event ) {
    switch (event.detail.value ) {
      case '0':
        this.pedidosAConfirmar = true;
        this.pedidosAEntregar = false;
        this.consultasClientes = false;
        break;

      case '1':
        this.pedidosAConfirmar = false;
        this.pedidosAEntregar = true;
        this.consultasClientes = false;
        break;

      case '2':
        this.pedidosAConfirmar = false;
        this.pedidosAEntregar = false;
        this.consultasClientes = true;
        break;
    }
  }

  confirmarPedido( pedido) {
    this.mozoService.confirmarPedido( pedido.id, estadoPedido.espera )
    .subscribe( res => {
      this.toastService.confirmationToast('Pedido confirmado');
    });
  }

  servirPedido( pedido ) {
    this.mozoService.confirmarPedido( pedido.id, estadoPedido.servido )
    .subscribe( res => {
      this.toastService.confirmationToast('Pedido servido');
    });
  }

  responderConsulta( consulta ) {
    this.mozoService.cambiarEstadoConsulta( consulta.id, estadoConsulta.contestada )
    .subscribe( res => {
      this.toastService.confirmationToast('Consulta terminada');
    });
  }
}
