import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-opciones-cliente',
  templateUrl: './opciones-cliente.page.html',
  styleUrls: ['./opciones-cliente.page.scss'],
})
export class OpcionesClientePage implements OnInit {

  pedido:Pedido;
  constructor( private route:ActivatedRoute,
               private pedidosService:PedidoService,
               private router:Router) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pedidosService.obtenerPedido(params.id).subscribe( (resp:Pedido)=>{
        this.pedido=resp;
        this.pedido.id=params.id;
      })
    });

  }
  
  verEstado(){
    this.router.navigate(['/mi-pedido',{id:this.pedido.id}]);
  }

  pedirCuenta(){
    this.router.navigate(['/cuenta-cliente',{id:this.pedido.id}]);
  }

}
