import { Injectable } from '@angular/core';
import { Mesa } from '../models/mesa';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { estadoMesa } from '../models/tipos';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  mesas;

  constructor(private db: AngularFireDatabase,private httpClient:HttpClient) {
    this.mesas = db.object('mesas').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
  }

  altaMesa( mesa:Mesa ){ 
   return this.httpClient.post(`${environment.hostFirebase}/mesas.json`,mesa).subscribe();
  }

  cambiarEstadoMesa(idMesa:string, estado:estadoMesa){
    return this.httpClient.patch(`${environment.hostFirebase}/mesas/${idMesa}.json`,{estado:estado});
  }

  obtenerEstadoMesa(idMesa){
    return this.httpClient.get(`${environment.hostFirebase}/mesas/${idMesa}.json`).pipe(map((datos:any)=>{return datos.estado}));
  }

  obtenerMesa(idMesa){
    return this.httpClient.get(`${environment.hostFirebase}/mesas/${idMesa}.json`).pipe(map( (dato:Mesa)=>{
      let mesa=dato;
      mesa.id=idMesa;
      return mesa;
    } )).toPromise();
  }

  obtenerMesas(){
    return this.mesas;
  }

  private objecToArray( datos: Object ){
    const mesas = [];
    console.log(datos);
    if(datos == null) return [];
    Object.keys( datos ).forEach( key =>{
          let mesa: Mesa = datos[key];
          mesa.id=key;
          mesas.push(mesa);
        
    })
    return mesas;
  }
}