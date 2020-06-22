import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { estadoConsulta, estadoPedido } from '../models/tipos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MozoService {

  private consultas: AngularFireList<any>;
  private pedidos: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private httpClient: HttpClient) {
    this.consultas = firebase.list('consultas');
    this.pedidos = firebase.list('pedidos');
  }

  obtenerConsultas() {
    return this.consultas;
  }

  cambiarEstadoConsulta( id: string , estConsulta: estadoConsulta ) {
    return this.httpClient.patch(`${environment.hostFirebase}/consultas/${id}.json`, { estado: estConsulta });
  }

  obtenerPedidos() {
    return this.pedidos;
  }

  confirmarPedido( id: string, estPedido: estadoPedido ) {
    return this.httpClient.patch(`${environment.hostFirebase}/pedidos/${id}.json`, { estado: estPedido });
  }

}
