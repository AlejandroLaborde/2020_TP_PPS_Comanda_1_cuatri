import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { FileService } from './file.service';
import { UsuariosService } from './usuarios.service';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor( private angularFireAuth:AngularFireAuth) { }

  /**
   * @param usuario 
   * Da de alta en Firebase Auth la persona con email y contraseña
   */
  public registraPersonal(usuario: Personal){
    return this.angularFireAuth.createUserWithEmailAndPassword(usuario.email,usuario.contraseña);
  }

  

  
}
