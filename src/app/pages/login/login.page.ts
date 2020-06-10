import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { tipoCliente } from 'src/app/models/tipos';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cliente: Cliente;
  clientes;
  clientesAnonimos;
  email;
  clave;
  alias;
  tipoLogin = 'completo';

  constructor( private clienteService: ClientesService, private loginService: LoginService, private router: Router,
               private toastService: ToastService ) { }

  ngOnInit() {
    this.clienteService.obtenerClientes().snapshotChanges().forEach( clientesSnapshot => {
      this.clientes = [];
      this.clientesAnonimos = [];
      clientesSnapshot.forEach( clienteSnapshot => {
        const cliente = clienteSnapshot.payload.toJSON() as Cliente;
        if ( cliente.tipo === tipoCliente.registrado ){
          this.clientes.push(cliente);
        }
        else {
          this.clientesAnonimos.push(cliente);
        }
      });
    });
  }

  cambiarTipoDeLogin( tipoLogin ) {
    this.tipoLogin = tipoLogin.detail.value;
  }

  changeClienteRegistrado( id ) {
    for (const cliente of this.clientes ) {
      if ( cliente.id === id ) {
        this.cliente = cliente;
        this.email = cliente.email;
        this.clave = cliente.clave;
      }
    }
  }

  changeClienteAnonimo( alias ) {
    for (const cliente of this.clientesAnonimos ) {
      if ( cliente.nombre === alias ) {
        this.cliente = cliente;
        this.alias = cliente.nombre;
      }
    }
  }

  onSubmitLogin(): void {
    if ( this.tipoLogin === 'completo' ) {
      if ( this.cliente.aprobado ) {
        this.loginService.logIn(this.email, this.clave)
        .then( respuesta => {
          this.email = '';
          this.clave = '';
          this.router.navigate(['/cliente']);
        });
      }
      else {
        this.toastService.errorToast('Su registro todavía no fue aprobado');
      }
    }
    else {
      for (const cliente of this.clientesAnonimos ) {
        if ( cliente.nombre === this.alias ) {
          this.alias = '';
          this.router.navigate(['/home']);
        }
      }
    }
  }
}
