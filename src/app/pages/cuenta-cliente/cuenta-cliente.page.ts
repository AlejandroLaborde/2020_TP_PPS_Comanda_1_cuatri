import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { estadoPedido, estadoProducto, tipoProducto } from 'src/app/models/tipos';
import { ToastService } from 'src/app/services/toast.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-cuenta-cliente',
  templateUrl: './cuenta-cliente.page.html',
  styleUrls: ['./cuenta-cliente.page.scss'],
})
export class CuentaClientePage implements OnInit {

  pedido:Pedido;
  total:number=0;
  verPropina:boolean;
  constructor( private route:ActivatedRoute,
               private pedidosService:PedidoService,
               private router:Router,
               private toast:ToastService,
               private scanner: BarcodeScanner,
               ) {
                this.verPropina=true;
    
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pedidosService.obtenerPedido(params.id).subscribe( (resp:Pedido)=>{
        this.pedido=resp;
        this.pedido.id=params.id;
        this.total=0;
        resp.productos.forEach( prod=>{
          if(prod.tipo== tipoProducto.propina){
            this.verPropina=false;
          }
          this.total += prod.precio;
        })
      })
    });

  }

  propina(){
    this.scanner.scan().then(data => {
      let text:any=JSON.parse(data.text);
      if(text.propina){
        let montoPropina = text.propina * this.total / 100;
        this.pedido.productos.push(new Producto('Propina','propina agregada por el cliente',0,montoPropina,estadoProducto.propina,'','','',tipoProducto.propina));
        this.pedidosService.altaPropina(this.pedido.id, this.pedido.productos).subscribe();
        this.verPropina=false;
      }else{
        this.toast.errorToast('El codigo QR no corresponde a una propina');
      }
      
    })
    .catch(err => {     
      this.toast.errorToast('El codigo QR es invalido');
    });
  }
  
  pedirCuenta(){
    this.pedidosService.cambiaEstadoPedido(this.pedido.id,estadoPedido.pendienteCobro).subscribe( resp=>{
      if(resp){
        this.toast.confirmationToast('Se envio el pedido de cuenta al mozo').then( res=>{
          this.router.navigate(['/opciones-cliente',{id:this.pedido.id}]);
        })
      }else{
        this.toast.errorToast('Surgio un problema al realizar la solicitud');
      }
    })
  }

}
