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
  esCliente = true;

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
    if ( this.esCliente ) {
      if ( this.tipoLogin === 'completo' ) {
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
      }
      else {
        let aliasInexistente = true;
        for (const cliente of this.clientesAnonimos ) {
          if ( cliente.nombre === this.alias ) {
            aliasInexistente = false;
            if( cliente.aprobado === true ) {
              this.router.navigate(['/cliente',{cliente:cliente.nombre}]);
              this.alias = '';
            }
            else {
              this.toastService.errorToast('Su registro todavía no fue aprobado');
              break;
            }
          }
        }
        if (aliasInexistente ) {
          this.toastService.errorToast('Alias inexistente');
        }
      }
    }
    else {
      this.loginService.logIn(this.email, this.clave)
      .then(res => {
        switch (this.usuario.tipo) {
          case tipoPersonal.supervisor:
            this.router.navigate(['/supervisor']);
            break;
          case tipoPersonal.dueño:
            this.router.navigate(['/supervisor']);
            break;
          case tipoPersonal.metre:
            this.router.navigate(['/metre']);
            break;
          case tipoPersonal.mozo:
            this.router.navigate(['/mozo']);
            break;
          case tipoPersonal.cocinero:
            this.router.navigate(['/cocinero']);
            break;
          case tipoPersonal.bartender:
              this.router.navigate(['/bartender']);
              break;
        
          default:
            break;
        }

        this.email = '';
        this.clave = '';
      });
      
    }
  }
}

/*

this.loginService.logIn(this.email, this.clave)
      .then( respuesta => {
        this.loginService.usuarioActual()
        .then( res => {
          if ( res.email === 'metre@mail.com') {
            this.router.navigate(['/metre']);
          }
          else if ( res.email === 'mozo@mozo.com') {
            this.router.navigate(['/mozo']);
          }
          else {
            
          }
        });
        this.email = '';
        this.clave = '';
      });

*/ 