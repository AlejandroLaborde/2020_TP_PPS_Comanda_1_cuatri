import { Component, OnInit } from '@angular/core';
import { MesasService } from 'src/app/services/mesas.service';
import { estadoMesa, estadoCliente, estadoPedido, estadoConsulta } from 'src/app/models/tipos';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { MesaComponent } from 'src/app/components/mesa/mesa.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastService } from 'src/app/services/toast.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import Swal from 'sweetalert2'
import { ConsultaMozoComponent } from 'src/app/components/consulta-mozo/consulta-mozo.component';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Consulta } from 'src/app/models/consulta';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { Cliente } from 'src/app/models/cliente';


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
               private popoverCtrl: PopoverController,
               private mesaService: MesasService,
               private productoService: ProductoService,
               private modalController: ModalController,
               private consultaService: ConsultasService,
               private router: Router,
               private route: ActivatedRoute,
               private productosService: ProductoService,
               private toastService:ToastService,
               private pedidosService: PedidoService,
               private scanner: BarcodeScanner ) {
                
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
                this.clienteActual = respuesta;
                this.verificaPedidoExistente(respuesta.id);
                // this.clienteService.obtenerCLiente(respuesta.id).subscribe((resp:any) =>{
                //   this.idClienteFirebase = resp.id;
                //   this.clienteActual = resp;
                // });
            })
          }
        })
      });
  }

  ngOnInit() {
    this.productoService.getProductos().then( resp=>{ 
      console.log(resp);
      this.productos=resp});
      this.clienteService.obtenerClientes().snapshotChanges().forEach( clientesSnapshot => {
        clientesSnapshot.forEach( snapshot => {
          const cliente = snapshot.payload.toJSON() as Cliente;
          if( cliente.nombre === this.clienteActual.nombre ) {
              this.clienteActual = cliente;
          }
        });
      });
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
          pedido.mesa.estado=estadoMesa.ocupada;
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

  miPedido(){
  
    this.scanner.scan().then(data => {
      if(data.text == this.pedido.mesa.id){
        this.router.navigate(['/mi-pedido',{id:this.pedido.id}]);
      }else{
        this.toastService.errorToast('El codigo no corresponde a su mesa asignada');
      }
    }).catch(err => {
        console.log("Error: ", err);
        this.toastService.errorToast('Codigo QR inválido');
      });
    
  }

  async modalConsultaMozo( ) {
    const popover = await this.popoverCtrl.create({
      component: ConsultaMozoComponent,
      componentProps:{productos:this.pedido},
      translucent: true
    });
    popover.present();  
    return popover.onDidDismiss().then(
      (data: any) => {
        if(data.data){
          if(data.data){
            const consulta = new Consulta(this.pedido.mesa,data.data,estadoConsulta.pendiente);
            this.consultaService.altaConsulta( consulta ).subscribe( resp=>{
              this.toastService.confirmationToast('Se envio tu consulta a los mozos');
            }) 
          }else{
            this.toastService.errorToast('Consulta cancelada...');
          }
        }else{
          this.toastService.errorToast('Consulta cancelada...');
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
