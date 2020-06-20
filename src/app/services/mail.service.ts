import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient, private toast: ToastService) { }

  correoAprobacion(cliente){

    this.httpClient.post(`https://us-central1-lacomanda-pps.cloudfunctions.net/mailer/`, {
          to: cliente.email,
          message: "Bienvenido " + cliente.nombre + " " + cliente.apellido,
          subject: "Su registro ha sido aprobado." 
          }).subscribe(res=>{
            this.toast.confirmationToast('Cliente aprobado. Correo enviado.');
          });  
  }










}
