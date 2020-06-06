import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileService } from './file.service';
import { UsuariosService } from './usuarios.service';
import { Personal } from '../models/personal';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor( private angularFireAuth: AngularFireAuth) { }

  /**
   * @param usuario
   * Da de alta en Firebase Auth la persona con email y contraseña
   */
  public registraPersonal(usuario: Personal){
    return this.angularFireAuth.createUserWithEmailAndPassword(usuario.email,usuario.contraseña);
  }

  public registraCliente(cliente: Cliente){
    return this.angularFireAuth.createUserWithEmailAndPassword(cliente.email, cliente.clave);
  }

  public registraClienteEnBD( cliente: Cliente) {

  }
}
