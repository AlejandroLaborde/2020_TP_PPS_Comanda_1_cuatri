import { Component, OnInit } from '@angular/core';
import { ClientesService } from "src/app/services/clientes.service";
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {

  clientes = []

  constructor( private clienteService: ClientesService) { }

  ngOnInit() {
    this.clienteService.obtenerClientes().snapshotChanges().forEach( clientesSnapshot => {
      clientesSnapshot.forEach( snapshot => {
        const cliente = snapshot.payload.toJSON() as Cliente;
        this.clientes.push(cliente);
      });
    });
  }

}
