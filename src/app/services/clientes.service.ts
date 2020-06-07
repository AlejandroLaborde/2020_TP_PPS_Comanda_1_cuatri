import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientes: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private httpClient: HttpClient) {
    this.clientes = firebase.list('clientes');
  }

  obtenerClientes(){
    return this.clientes;
  }
}
