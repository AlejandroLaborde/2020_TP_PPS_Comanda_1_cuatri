import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items;
  constructor( private loginService: LoginService) {
    this.loginService.items.subscribe(da=>{
      this.items=da;
    });
    
  }


  alta(){
    this.loginService.alta();
  }
  modifica(){
    this.items[3].test="esto es una modificacion";
    this.loginService.modifica(this.items[3]);
  }
}
