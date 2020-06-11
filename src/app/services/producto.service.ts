import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }

  altaProducto( producto: Producto){
    return this.httpClient.post(`${environment.hostFirebase}/productos.json`,producto);
  }

  getProductos( ){
    return this.httpClient.get(`${environment.hostFirebase}/productos.json`).pipe(map(resp=>{return this.objecToArray(resp)})).toPromise();
  }

  private objecToArray( datos: Object ){
    const productos = [];
    if(datos == null) return [];
    Object.keys( datos ).forEach( key =>{
          let producto: Producto = datos[key];
          producto.id=key;
          productos.push(producto);
    })
    return productos;
  }
}
