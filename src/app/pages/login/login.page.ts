import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Cliente } from 'src/app/models/cliente';
import { tipoCliente, tipoPersonal, estadoCliente } from 'src/app/models/tipos';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Personal } from 'src/app/models/personal';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: Personal;
  usuarios = [];
  cliente: Cliente;
  clientes;
  clientesAnonimos;
  email;
  clave;
  alias;
  tipoLogin = 'completo';
  select = true;

  constructor( private clienteService: ClientesService, private loginService: LoginService, private router: Router,
               private toastService: ToastService, private usuarioService: UsuariosService) { }

  ngOnInit() {
    this.clienteService.obtenerClientes().snapshotChanges().forEach( clientesSnapshot => {
      this.clientes = [];
      this.clientesAnonimos = [];
      clientesSnapshot.forEach( clienteSnapshot => {
        const cliente = clienteSnapshot.payload.toJSON() as Cliente;
        if ( cliente.tipo === tipoCliente.registrado){
          this.clientes.push(cliente);
        }
        else {
          this.clientesAnonimos.push(cliente);
        }
      });
    });

    // Para traer empleados
    this.usuarioService.obtenerUsuarios().snapshotChanges().forEach( usuariosSnapshot => {
      usuariosSnapshot.forEach( snapshot => {
        const Personal = snapshot.payload.toJSON() as Personal;
        this.usuarios.push(Personal);
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

  changePersonal( id ) {
    for (const personal of this.usuarios ) {
      if ( personal.id === id ) {
        this.usuario = personal;
        this.email = personal.email;
        this.clave = personal.clave;
      }
    }
  }

  

// login modificado para ingreso con supervisor o dueño
  onSubmitLogin(): void {
    if ( this.tipoLogin === 'completo' ) {
      if(this.select) {
        if ( this.cliente.aprobado ) {
          this.loginService.logIn(this.email, this.clave)
          .then( respuesta => {
            this.router.navigate(['/cliente',{cliente:this.email}]);
            this.email = '';
            this.clave = '';
          });
        }
        else {
          this.toastService.errorToast('Su registro todavía no fue aprobado');
        }
      }else{
        this.loginService.logIn(this.email, this.clave)
          .then( respuesta => {
            this.email = '';
            this.clave = '';
            this.router.navigate(['/supervisor']);
          });

      }
    }
    else {
      for (const cliente of this.clientesAnonimos ) {
        if ( cliente.nombre === this.alias ) {
          this.router.navigate(['/cliente',{cliente:cliente.nombre}]);
          this.alias = '';
        }
      }
    }
  }
}
