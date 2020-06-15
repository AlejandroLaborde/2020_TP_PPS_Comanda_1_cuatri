import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { map  } from 'rxjs/operators';
import { Observable } from 'rxjs/';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor( public angularFireAuth:AngularFireAuth ) { 
    
  }

  public logIn( mail:string, contraseña:string ){
    return this.angularFireAuth.signInWithEmailAndPassword(mail,contraseña);
  }

  public usuarioActual(){
    return this.angularFireAuth.currentUser;
  }

  public logueado(){
    return this.angularFireAuth.currentUser.then(resp=>{
      if(resp){
        return true;
      }else{
        return false;
      }
    }) 
  }

  public logOut(){
    return this.angularFireAuth.signOut();
  }

}
