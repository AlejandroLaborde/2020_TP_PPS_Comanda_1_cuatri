import { Component, OnInit } from '@angular/core';
import { MozoService } from 'src/app/services/mozo.service';
import { Consulta } from 'src/app/models/consulta';
import { estadoConsulta } from 'src/app/models/tipos';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {

  consultas = [];
  cantConsultas = 100000;

  constructor(private mozoService: MozoService, private toastService: ToastService) { }

  ngOnInit() {
    this.mozoService.obtenerConsultas().snapshotChanges().forEach( consultasSnapshot => {
      this.consultas = [];
      consultasSnapshot.forEach( snapshot => {
        const consulta = snapshot.payload.toJSON() as Consulta;
        if( consulta.estado === estadoConsulta.pendiente ) {
            consulta.id = snapshot.payload.key;
            this.consultas.push(consulta);
        }
      });
      if ( this.consultas.length > this.cantConsultas ) {
        Swal.fire({
          icon: 'info',
          title: 'Consultas',
          text: 'Se realizó una nueva consulta',
        })
      }
      this.cantConsultas = this.consultas.length;
    });
  }

  responderConsulta( consulta ) {
    this.mozoService.cambiarEstadoConsulta( consulta.id, estadoConsulta.contestada )
    .subscribe( res => {
      this.toastService.confirmationToast('Consulta terminada');
    });    
  }

}
