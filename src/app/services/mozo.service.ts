import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { estadoConsulta } from '../models/tipos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MozoService {

  private consultas: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private httpClient: HttpClient) {
    this.consultas = firebase.list('consultas');
  }

  obtenerConsultas() {
    return this.consultas;
  }

  cambiarEstadoConsulta( id:string , estado:estadoConsulta ) {
    return this.httpClient.patch(`${environment.hostFirebase}/consultas/${id}.json`,{estado:estado});
  }

}
