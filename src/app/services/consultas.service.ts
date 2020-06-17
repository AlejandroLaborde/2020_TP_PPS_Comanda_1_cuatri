import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService  {

  consultas: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase, private httpClient: HttpClient) {

    this.consultas = firebase.list('consultas');
    console.log(this.consultas);
  }

  altaConsulta( consulta: Consulta ){ 
    return this.httpClient.post(`${environment.hostFirebase}/consultas.json`,consulta);
  }
  
  
}
