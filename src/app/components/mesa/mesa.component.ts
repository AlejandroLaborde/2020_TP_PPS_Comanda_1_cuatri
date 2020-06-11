import { Component, OnInit, Input } from '@angular/core';
import { Mesa } from 'src/app/models/mesa';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss'],
})
export class MesaComponent implements OnInit {

  @Input() mesa:Mesa;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }
}
