import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }

  altaProducto( producto: Producto){
    return this.httpClient.post(`${environment.hostFirebase}/productos.json`,producto);
  }

}
