import { Component, OnInit } from '@angular/core';
import { ClientesService } from "src/app/services/clientes.service";
import { Cliente } from 'src/app/models/cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {

  clientes = []

  constructor( private clienteService: ClientesService, private httpClient:HttpClient, private toast: ToastService) { }

  ngOnInit() {
    this.clienteService.obtenerClientes().snapshotChanges().forEach( clientesSnapshot => {
      clientesSnapshot.forEach( snapshot => {
        const cliente = snapshot.payload.toJSON() as Cliente;
        if(!cliente.aprobado){
            cliente.idBD = snapshot.payload.key;
            this.clientes.push(cliente);
        }
      });
    });
  }


  aprobarCliente(cliente){
    console.log('este es el ID: ', cliente.idBD);
    this.httpClient.patch(`${environment.hostFirebase}/clientes/${cliente.idBD}.json`, { aprobado: true }).subscribe(
      res=>{
        // envio de correo automatico.
        this.clientes = [];
        this.httpClient.post(`https://us-central1-lacomanda-pps.cloudfunctions.net/mailer/`, {
          to: "alee_2695@live.com.ar",
          message: "Bienvenido " + cliente.nombre + " " + cliente.apellido,
          subject: "Su registro ha sido aprobado." 
          }).subscribe(res=>{
            this.toast.confirmationToast('Cliente aprobado. Correo enviado.');
          });
        
      });
    
  }

}
