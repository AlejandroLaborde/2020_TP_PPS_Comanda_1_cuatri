import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { estadoCliente } from 'src/app/models/tipos';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metre',
  templateUrl: './metre.page.html',
  styleUrls: ['./metre.page.scss'],
})
export class MetrePage implements OnInit {

  clientesEnEspera = [];
  cantClientesEnEspera = 100000;

  constructor(private clienteService: ClientesService, private toastService: ToastService) { }

  ngOnInit() {
    this.clienteService.obtenerClientes().snapshotChanges().forEach( clientesSnapshot => {
      this.clientesEnEspera = [];
      clientesSnapshot.forEach( snapshot => {
        const cliente = snapshot.payload.toJSON() as Cliente;
        if( cliente.estado === estadoCliente.espera ) {
            cliente.idBD = snapshot.payload.key;
            this.clientesEnEspera.push(cliente);
        }
      });
      if ( this.clientesEnEspera.length > this.cantClientesEnEspera ) {
        Swal.fire({
          icon: 'info',
          title: 'Clientes',
          text: 'Hay un nuevo cliente en la lista de espera',
        })
      }
      this.cantClientesEnEspera = this.clientesEnEspera.length;
    });
  }

  aceptarCliente( cliente ) {
    this.clienteService.cambiarEstadoCliente( cliente.idBD, estadoCliente.aceptado )
    .subscribe( res => {
      this.toastService.confirmationToast('El cliente puede tomar la mesa');
    });    
  }
}
