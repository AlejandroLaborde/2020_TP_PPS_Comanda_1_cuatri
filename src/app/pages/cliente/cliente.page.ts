import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MesasService } from 'src/app/services/mesas.service';
import { estadoMesa, estadoProducto, tipoMesa } from 'src/app/models/tipos';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { MesaComponent } from 'src/app/components/mesa/mesa.component';
import { Mesa } from 'src/app/models/mesa';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  productos:Producto[];
  constructor( private usuarioService:UsuariosService,
               private mesaService: MesasService,
               private productoService: ProductoService,
               public modalController: ModalController,
               public router: Router,
               public navControler: NavController,
               public productosService: ProductoService ) { }

  ngOnInit() {
    this.productoService.getProductos().then( resp=>{ 
      console.log(resp);
      this.productos=resp});
  }

  respuestaLector( mesa:any ){
    //-M8n2hrTjzmMuUD66HhC
    //mesa.text
    this.mesaService.obtenerMesa(mesa.text).then( resp=>{
      if(resp.estado == estadoMesa.ocupada){
       this.modalEstadoMesa(resp).then();
      }else{
        this.modalEstadoMesa(resp).then();      
      }
    })
  }



  async modalEstadoMesa( mesa, comenzal?:any ) {
    console.log(mesa);
    const modal = await this.modalController.create({
      component: MesaComponent,
      cssClass: 'my-custom-class',
      backdropDismiss:true,
      componentProps: { mesa: mesa }
    });
    return await modal.present();
  }

}
