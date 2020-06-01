import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async errorToast(messageParam: string) {
    const toast = await this.toastController.create({
      message: messageParam,
      duration: 5000,
      color: 'danger'
    });
    toast.present();
  }

  async confirmationToast(messageParam: string) {
    const toast = await this.toastController.create({
      message: messageParam,
      duration: 5000,
      color: 'success'
    });
    toast.present();
  }
}
