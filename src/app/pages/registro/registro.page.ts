import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage implements OnInit {

  nombre: string;
  apellido: string;
  email: string;
  clave: string;
  confirmarClave: string;
  alias: string;
  registros = [{ id: 0, tipo: 'Registro completo' }, { id: 1, tipo: 'Registro anónimo' }];
  registroCompleto = true;

  constructor( private toastService: ToastService, private _registroService: RegistroService ) { }


  cambioDeRegistro( event ) {
    this.registroCompleto = event.detail.value === '0' ? true : false;
  }

  validarSoloLetras( valor ) {
    if (valor === undefined || valor === '' || !/^[A-Za-z\s\xF1\xD1]+$/.test(valor)) {
      this.toastService.errorToast('Formato de nombre y/o apellido inválido');
      return false;
    }
    return true;
  }

  validarEmail(valor) {
    if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(valor)) {
      this.toastService.errorToast('Formato de email inválido');
      return false;
    }
    return true;
  }

  validarContraseña( clave, claveConfirmada ) {
    if ( clave !== claveConfirmada ) {
      this.toastService.errorToast('La contraseña se confirmó correctamente');
      return false;
    }
    return true;
  }

  enviarDatos() {
    if ( this.validarSoloLetras( this.nombre ) && this.validarSoloLetras(this.apellido) && this.validarEmail(this.email)
         && this.validarContraseña(this.clave, this.confirmarClave )) {
          this.toastService.confirmationToast('Chequeá tu email para la confirmación de tu registro');
    }
  }

  registroAnonimo() {
    this.toastService.confirmationToast('Podrás ingresar a la app cuando un supervisor lo apruebe');
  }

  recibirQR(datos) {
    console.log('RECIBIDO', datos);
    alert('RECIBIDO' + datos);
  }

  ngOnInit() {
  }

}
