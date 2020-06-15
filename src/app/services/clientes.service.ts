import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { map } from 'rxjs/internal/operators/map';
import { estadoCliente } from '../models/tipos';


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

  obtenerClientePorEmail( email ){
    return this.httpClient.get(`${environment.hostFirebase}/clientes.json`).pipe(map(datos=>{return this.filtraClientePorMail( datos, email )}));
  }

  obtenerClienteAnonimo( alias ){
    return this.httpClient.get(`${environment.hostFirebase}/clientes.json`).pipe(map(datos=>{return this.filtraClientePorAlias( datos, alias )}));
  }

  obtenerCLiente( id ){
    return this.firebase.object(`clientes/${id}`).valueChanges();
  }

  cambiarEstadoCliente( id:string , estado:estadoCliente ){
    return this.httpClient.patch(`${environment.hostFirebase}/clientes/${id}.json`,{estado:estado});
  }

  updateFotoCliente( idCliente: string, url: string){
    return this.httpClient.patch(`${environment.hostFirebase}/clientes/${idCliente}.json`, { foto: url });
  }




  private filtraClientePorAlias( lista, alias ){

    let cliente;
    let clientes = this.objecToArray(lista);
    clientes.forEach( clien =>{
      if(clien.nombre == alias){
        cliente = clien;
      }
    });
    return cliente;

  }
  private filtraClientePorMail( lista, email ){

    let cliente;
    let clientes = this.objecToArray(lista);
    clientes.forEach( clien =>{
      if(clien.email == email){
        cliente = clien;
      }
    });
    return cliente;

  }

  private objecToArray( datos: Object ){
    const clientes = [];
    if(datos == null) return [];
    Object.keys( datos ).forEach( key =>{
          let cliente: Cliente = datos[key];
          cliente.id=key;
          clientes.push(cliente);
    })
    return clientes;
  }
}
