import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { RegistroService } from 'src/app/services/registro.service';
import { Cliente } from 'src/app/models/cliente';
import { tipoCliente, estadoCliente, tipoPersonal } from 'src/app/models/tipos';
import { CameraService } from 'src/app/services/camara.service';
import { FileService } from 'src/app/services/file.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage implements OnInit {

  nombre = '';
  apellido = '';
  email = '';
  dni = '';
  sexo = '';
  clave = '';
  confirmarClave = '';
  alias = '';
  registros = [{ id: 0, tipo: 'Registro completo' }, { id: 1, tipo: 'Registro anónimo' }];
  registroCompleto = true;
  finalizoRegistro = false;
  cliente: Cliente;

  constructor( private toastService: ToastService, private registroService: RegistroService, private cameraService: CameraService,
               private fileService: FileService, private clientesService: ClientesService ) { }


  cambioDeRegistro( event ) {
    this.registroCompleto = event.detail.value === '0' ? true : false;
  }

  validarSoloLetras( valor, nombre ) {
    if (valor === undefined || valor === '' || !/^[A-Za-z\s\xF1\xD1]+$/.test(valor)) {
      if ( nombre ) {
        this.toastService.errorToast('Formato de nombre y/o apellido inválido');
      }
      else {
        this.toastService.errorToast('Formato de sexo inválido');
      }
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

  validarDNI( dni: string ) {
    if ( dni.length < 6 || dni.length > 8 ) {
      this.toastService.errorToast('DNI: Cantidad de dígitos inválida');
      return false;
    }
    else {
      for ( const caracter of dni ) {
        if ( isNaN( parseInt( caracter, 10 )) ) {
          this.toastService.errorToast('Formato de dni inválido');
          return false;
        }
      }
    }
    return true;
  }

  validarContraseña( clave, claveConfirmada ) {
    if ( clave !== claveConfirmada ) {
      this.toastService.errorToast('La contraseña no se confirmó correctamente');
      return false;
    }
    return true;
  }

  enviarDatos() {
    if ( this.validarSoloLetras( this.nombre, true ) && this.validarSoloLetras(this.apellido, true) && this.validarEmail(this.email)
        && this.validarContraseña(this.clave, this.confirmarClave ) && this.validarDNI( this.dni ) &&
        this.validarSoloLetras( this.sexo, false )) {

      this.cliente = new Cliente(this.nombre, this.email, this.dni, this.sexo, tipoCliente.registrado, this.clave, false,
                                 estadoCliente.off, this.apellido);
      this.registroService.registraCliente( this.cliente )
      .then( respuesta => {
        this.cliente.id = respuesta.user.uid;
        this.registroService.registraClienteEnBD( this.cliente)
        .subscribe( res => {
          this.cliente.idBD = res['name'];
          this.vaciarInputs();
          this.finalizoRegistro = true;
          this.toastService.confirmationToast('Chequeá tu email para la confirmación de tu registro');
        });
      })
      .catch(err => {
        this.toastService.errorToast(err);
      });
    }
  }

  registroAnonimo() {
    this.cliente = new Cliente( this.alias, this.email, this.dni, this.sexo, tipoCliente.anonimo, this.clave, true, estadoCliente.off);
    this.registroService.registraClienteEnBD( this.cliente )
    .subscribe( res => {
      this.alias = '';
      this.toastService.confirmationToast('Ingrese a la aplicación utilizando el alias registrado');
    });
  }

  sacarFoto() {
    this.cameraService.sacarFoto()
    .then( datosImagen => {
      if (datosImagen !== 'No Image Selected') {
        this.fileService.guardarEnStorage(datosImagen, this.cliente.id)
        .then( respuesta => {
          this.fileService.referenciaCloudStorage( this.cliente.id )
          .subscribe( url => {
            this.clientesService.updateFotoCliente( this.cliente.idBD, url)
            .subscribe( res => {
              this.toastService.confirmationToast('Su foto se guardó correctamente');
            });
          });
        })
        .catch(err => {
          this.toastService.errorToast(err);
        });
      }
    })
    .catch(err => {
      this.toastService.errorToast(err);
    });
  }

  vaciarInputs() {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.clave = '';
    this.confirmarClave = '';
    this.sexo='';
    this.dni='';
  }

  recibirQR(datos) {
    const split = datos.text.split('@');
    this.dni= split[1];
    this.nombre = split[5];
    this.apellido = split[4];
    this.sexo=split[8];
    // this.registroForm.controls['dni'].setValue(parseInt(split[4]));
  }

  ngOnInit() {
  }

}
