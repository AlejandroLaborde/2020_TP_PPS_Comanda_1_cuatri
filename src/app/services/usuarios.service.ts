import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ToastService } from './toast.service';
import { Personal } from '../models/personal';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private toastService: ToastService) {
    this.usuarios = firebase.list('personal');
  }

  obtenerUsuarios(){
    return this.usuarios;
  }


  validarUsuario(usuarios = [], email:string, clave:string ) : any{

    usuarios.forEach(us => {
      if(email == us.email && clave == us.clave){
        return us;
      }else{
        return null;
      }

    });
  }

}
