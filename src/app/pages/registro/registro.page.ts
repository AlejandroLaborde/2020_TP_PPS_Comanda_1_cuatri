import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  constructor( private toastService: ToastService ) { }

  enviarDatos(): void{
    this.toastService.confirmationToast('Chequeá tu email para la confirmación de tu registro');
  }

  registroAnonimo(): void {
    this.toastService.confirmationToast('Podrás ingresar a la app cuando un supervisor lo apruebe');
  }

  recibirQR(datos) {
    console.log('RECIBIDO', datos);
    alert('RECIBIDO'+ datos);
  }

  ngOnInit() {
  }

}
