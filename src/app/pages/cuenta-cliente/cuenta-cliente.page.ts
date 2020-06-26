import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { estadoPedido } from 'src/app/models/tipos';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cuenta-cliente',
  templateUrl: './cuenta-cliente.page.html',
  styleUrls: ['./cuenta-cliente.page.scss'],
})
export class CuentaClientePage implements OnInit {

  pedido:Pedido;
  total:number=0;
  constructor( private route:ActivatedRoute,
               private pedidosService:PedidoService,
               private router:Router,
               private toast:ToastService) {
    
    
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pedidosService.obtenerPedido(params.id).subscribe( (resp:Pedido)=>{
        this.pedido=resp;
        this.pedido.id=params.id;
        this.total=0;
        resp.productos.forEach( prod=>{
          this.total += prod.precio;
        })
      })
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
