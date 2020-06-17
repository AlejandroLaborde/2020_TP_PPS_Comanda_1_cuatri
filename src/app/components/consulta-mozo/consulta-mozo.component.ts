import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-consulta-mozo',
  templateUrl: './consulta-mozo.component.html',
  styleUrls: ['./consulta-mozo.component.scss'],
})
export class ConsultaMozoComponent implements OnInit {

  public consulta;
  constructor(private modalControler:PopoverController) {
    
  }

  ngOnInit() {}

  cancelar(){
    this.modalControler.dismiss();
  }
  enviar(){
    this.modalControler.dismiss(this.consulta);
  }
}
