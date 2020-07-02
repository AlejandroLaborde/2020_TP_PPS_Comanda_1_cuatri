import { Component, OnInit } from '@angular/core';
import { MozoService } from 'src/app/services/mozo.service';
import { Consulta } from 'src/app/models/consulta';
import { estadoConsulta, estadoPedido, estadoMesa, estadoCliente } from 'src/app/models/tipos';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { Pedido } from 'src/app/models/pedido';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {
 
  consultas = [];
  pedidosPendientes = [];
  pedidosPreparando = [];
  pedidosListos = [];
  pedidosCobro = [];
  cantListos = 100000;
  cantConsultas = 100000;
  pedidosAConfirmar = true;
  pedidosAEntregar: boolean;
  consultasClientes: boolean;
  cobrar: boolean;
  preparandose: boolean;
  secciones = [ { id: 0, descripcion: 'P. Pendientes'} , { id: 1, descripcion: 'P. Preparandose'}, {id: 2, descripcion: 'P.Listos'},
                { id: 3, descripcion: 'Consultas'}, { id: 4, descripcion: 'Cobrar'}];

  constructor(private mozoService: MozoService, private toastService: ToastService, private mesaService: MesasService, 
              private pedidoService: PedidoService, private clienteService: ClientesService ) { }

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
      this.pedidosCobro = [];
      this.pedidosPreparando = [];
      pedidosSnapshot.forEach( snapshot => {
        const pedido = snapshot.payload.toJSON() as Pedido;
        pedido.id = snapshot.payload.key;
        if ( pedido.estado === estadoPedido.inicial ) {
          this.pedidosPendientes.push(pedido);
        }
        if ( pedido.estado === estadoPedido.preparandose ) {
          this.pedidosPreparando.push(pedido);
        }
        if ( pedido.estado === estadoPedido.listo ) {
          this.pedidosListos.push(pedido);
        }
        if ( (pedido.estado === estadoPedido.pendienteCobro || pedido.estado === estadoPedido.abonado) &&
              pedido.mesa.estado === estadoMesa.ocupada ) {
          pedido.total = this.obtenerTotalPedido(pedido.productos);
          this.pedidosCobro.push(pedido);
        }
      });
      if (this.pedidosListos.length > this.cantListos){
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
        this.preparandose = false;
        this.pedidosAEntregar = false;
        this.consultasClientes = false;
        this.cobrar = false;
        break;

      case '1':
        this.pedidosAConfirmar = false;
        this.preparandose = true;
        this.pedidosAEntregar = false;
        this.consultasClientes = false;
        this.cobrar = false;
        break;

      case '2':
        this.pedidosAConfirmar = false;
        this.preparandose = false;
        this.pedidosAEntregar = true;
        this.consultasClientes = false;
        this.cobrar = false;
        break;

      case '3':
        this.pedidosAConfirmar = false;
        this.preparandose = false;
        this.pedidosAEntregar = false;
        this.consultasClientes = true;
        this.cobrar = false;
        break;
      
      case '4':
        this.pedidosAConfirmar = false;
        this.preparandose = false;
        this.pedidosAEntregar = false;
        this.consultasClientes = false;
        this.cobrar = true;
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

  confirmarPago( pedido ) {
    this.mozoService.confirmarPedido( pedido.id, estadoPedido.abonado )
    .subscribe( res => {
      this.toastService.confirmationToast( 'Se confirmó el pago del pedido');
    });
  }

  liberarMesa(pedido) {
    pedido.mesa.estado = estadoMesa.libre;
    this.pedidoService.updatePedido(pedido)
    .subscribe( respuesta => {
      this.mesaService.cambiarEstadoMesa( pedido.mesa.id, estadoMesa.libre )
      .subscribe( res => {
        this.clienteService.cambiarEstadoCliente( pedido.cliente.id, estadoCliente.off );
        this.toastService.confirmationToast('La ' + pedido.mesa.nombrePublico + ' quedó libre');
      });
    });
  }

  responderConsulta( consulta ) {
    this.mozoService.cambiarEstadoConsulta( consulta.id, estadoConsulta.contestada )
    .subscribe( res => {
      this.toastService.confirmationToast('Consulta terminada');
    });
  }

  obtenerTotalPedido( productos ) {
    let subtotal = 0;
    for (const producto in productos ) {
      if ( producto ) {
        subtotal += productos[producto].precio;
      }
    }
    return subtotal;
  }
}
