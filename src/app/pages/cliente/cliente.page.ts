import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MesasService } from 'src/app/services/mesas.service';
import { estadoMesa, estadoProducto } from 'src/app/models/tipos';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  constructor( private usuarioService:UsuariosService,
               private mesaService: MesasService,
              private productoService: ProductoService ) { }

  ngOnInit() {
    
  }

  respuestaLector( mesa ){
    this.mesaService.obtenerMesa(mesa).subscribe( resp=>{
      if(resp == estadoMesa.ocupada){
       alert("mesa ocupada");
      }else{
       alert("mesa Libre");
      }
    })
  }

}
