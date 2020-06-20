import { Component, OnInit } from '@angular/core';
import { ClientesService } from "src/app/services/clientes.service";
import { Cliente } from 'src/app/models/cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {

  clientes = []

  constructor( private clienteService: ClientesService, private httpClient:HttpClient,
     private toast: ToastService, private mailService: MailService) { }

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
        this.mailService.correoAprobacion(cliente);
        
      });
    
  }

}
