import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  idPedido;
  encuesta:FormGroup;
  opcionesAtencion=[1,2,3,4,5];
  mensaje='Buena';

  constructor( private route:ActivatedRoute,
               private router:Router,
               private miConstructor: FormBuilder,
               private pedidos:PedidoService,
               private toas: ToastService ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.idPedido = params.id;
    });

    this.encuesta = this.miConstructor.group({
      comida: new FormControl('3', []),
      funcionamientoApp: new FormControl(50, [ ]),
      comentario: new FormControl('', [ ]),
    });
  }

  submit(){
    let encuesta={comida:this.encuesta.value['comida'],funcionamientoApp:this.encuesta.value['funcionamientoApp'],comentario:this.encuesta.value['comentario']};
    this.pedidos.altaEncuesta(this.idPedido,encuesta).subscribe( resp=>{
      this.toas.confirmationToast('Muchas gracias por responder la encuesta');
      this.router.navigate(['/opciones-cliente',{id:this.idPedido}]);

    })

  }

  cambiaMensaje(){
    if( this.encuesta.value['funcionamientoApp']<= 20 ){ this.mensaje = 'Mala'}
    if( this.encuesta.value['funcionamientoApp']>= 80 ){ this.mensaje = 'Excelente'}
    if( this.encuesta.value['funcionamientoApp']>= 20 && this.encuesta.value['funcionamientoApp']< 40 ){ this.mensaje = 'Regular'}
    if( this.encuesta.value['funcionamientoApp']>= 40 && this.encuesta.value['funcionamientoApp']< 60 ){ this.mensaje = 'Buena'}
    if( this.encuesta.value['funcionamientoApp']>= 60 && this.encuesta.value['funcionamientoApp']< 80 ){ this.mensaje = 'Muy Buena'}
  }


}
