import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  clientes;

  constructor( private clienteService: ClientesService ) { }

  onSubmitLogin(): void {

  }

  ngOnInit() {
    this.clienteService.obtenerClientes().snapshotChanges().forEach( clientesSnapshot => {
      this.clientes = [];
      clientesSnapshot.forEach( clienteSnapshot => {
        const cliente = clienteSnapshot.payload.toJSON();
        this.clientes.push(cliente as Cliente);
      });
    });
  }

}
