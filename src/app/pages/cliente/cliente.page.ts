import { Component, OnInit } from '@angular/core';
import { MesasService } from 'src/app/services/mesas.service';
import { estadoMesa, estadoCliente, estadoPedido } from 'src/app/models/tipos';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ModalController, NavController } from '@ionic/angular';
import { MesaComponent } from 'src/app/components/mesa/mesa.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastService } from 'src/app/services/toast.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  productos:Producto[];
  clienteActual;
  idClienteFirebase;
  pedido:Pedido;
  clienteParams
  constructor( private clienteService:ClientesService,
               private mesaService: MesasService,
               private productoService: ProductoService,
               public modalController: ModalController,
               public router: Router,
               private route: ActivatedRoute,
               public navControler: NavController,
               public productosService: ProductoService,
               public toastService:ToastService,
               public pedidosService: PedidoService ) {
                
      this.route.params.subscribe(params => {
        this.clienteParams=params.cliente;
        this.clienteService.obtenerClientePorEmail(params.cliente ).subscribe( respuesta=>{
            if(respuesta){
              this.idClienteFirebase = respuesta.id;
              this.verificaPedidoExistente(respuesta.id);
              this.clienteService.obtenerCLiente(respuesta.id).subscribe((resp:any) =>{
                this.clienteActual = resp;
              });
            }else{
              this.clienteService.obtenerClienteAnonimo( params.cliente ).subscribe(respuesta=>{
                this.idClienteFirebase = respuesta.id;
                this.verificaPedidoExistente(respuesta.id);
                this.clienteService.obtenerCLiente(respuesta.id).subscribe((resp:any) =>{
                  this.idClienteFirebase = resp.id;
                  this.clienteActual = resp;
                });
            })
          }
        })
      });
  }

  ngOnInit() {
    this.productoService.getProductos().then( resp=>{ 
      console.log(resp);
      this.productos=resp});
  }

  ponerEnEspera( dato ){
    if(dato.text=='PonerEnEspera'){
      this.clienteService.cambiarEstadoCliente(this.idClienteFirebase,estadoCliente.espera).subscribe();
    }
  }

  verificaPedidoExistente(idCliente){
    this.pedidosService.obtenerPedidoPorIDCliente(idCliente).subscribe(pedidoExistente=>{
      this.pedido=pedidoExistente;
    })
  }
  realizarPrdido(){
    this.router.navigate(['/alta-pedido',{pedido:this.pedido.id,cliente:this.clienteParams}])
  
  }

  asociarConMesa( mesaLeida ){
    this.mesaService.obtenerMesa(mesaLeida.text).then( mesa =>{
      if(mesa.estado == estadoMesa.ocupada){
        this.toastService.errorToast('Esta mesa se encuentra ocupada');
      }else{
        this.mesaService.cambiarEstadoMesa(mesa.id.toString(),estadoMesa.ocupada).subscribe();
        if(this.clienteActual.estado != estadoCliente.aceptado){
          this.toastService.errorToast('Debes estar primero en lista de espera para poder acceder a la mesa');
        }else{
          this.clienteService.cambiarEstadoCliente(this.idClienteFirebase,estadoCliente.sentado).subscribe();
          const pedido = new Pedido();
          pedido.cliente= this.clienteActual;
          pedido.cliente.id=this.idClienteFirebase; 
          pedido.mesa=mesa;
          pedido.estado=estadoPedido.inicial;
          this.pedidosService.altaPedido(pedido).subscribe( (resp:any)=>{
            this.pedido = pedido;
            this.pedido.id=resp;
           this.toastService.confirmationToast('Se asocio correctamente');
          });
        }
      }
    })
  }

  respuestaLector( mesa:any ){
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
