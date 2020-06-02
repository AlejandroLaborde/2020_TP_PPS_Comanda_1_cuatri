import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';
import { MesasService } from 'src/app/services/mesas.service';
import { Mesa } from 'src/app/models/mesa';
import { tipoMesa, estadoMesa } from 'src/app/models/tipos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items;
  constructor( ) {
   
  }


  alta(){
  }
  modifica(){
    
  }
}
