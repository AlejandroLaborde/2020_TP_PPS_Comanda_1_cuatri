import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items;
  constructor( private loginService: LoginService) {
    this.items=this.loginService.items;
  }


  alta(){
    this.loginService.alta();
  }
}
