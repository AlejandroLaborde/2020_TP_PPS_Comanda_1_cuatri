import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: OSNotificationPayload[] = [];
  pushListener = new EventEmitter<OSNotificationPayload>();
  userId;

  constructor(private oneSignal: OneSignal,
              private storage: Storage,
              private httpClient: HttpClient) {
    this.cargarMensajes();
  }

  async getMensajes(){
    await this.cargarMensajes();
    return [...this.mensajes];
  }

  configuracionInicial(){
    this.oneSignal.startInit('02d56b36-8217-4866-a871-5334f28c91dd', '48076322712');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(( noti ) => {
    // do something when notification is received
      console.log('Notificación recibida', noti);
      this.notificacionRecibida( noti );
    });

    this.oneSignal.handleNotificationOpened().subscribe( async ( noti ) => {
      // do something when a notification is opened
      console.log('Notificación abierta', noti);
      await this.notificacionRecibida( noti.notification );
    });
    this.oneSignal.getIds().then( info => {
      this.userId = info.userId;
      console.log( 'userId', this.userId );
    });

    this.oneSignal.endInit();
  }

  async notificacionRecibida( noti: OSNotification ) {
    await this.cargarMensajes();
    const payload = noti.payload;
    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID );
    if (existePush) {
      return;
    }
    this.mensajes.unshift( payload );
    this.pushListener.emit( payload );
    await this.guardarMensajes();
  }

  guardarMensajes() {
    this.storage.set('mensajes', this.mensajes);
  }

  async cargarMensajes() {
    this.mensajes = await this.storage.get('mensajes') || [];
    return this.mensajes;
  }

  enviarNotificacionSupervisor( cliente: Cliente){

    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': environment.authorizationPush
    });

    const options = {
       headers: httpHeaders
    };

    const body = {
      app_id: environment.oneSignalAppId,
      data: { for: 'Supervisor', data: cliente },
      contents: {en: 'A client registered', es: 'Un cliente se registró' },
      headings: { en: 'New client', es: 'Nuevo cliente' },
      include_player_ids: ['fb198ea2-a556-4754-a0e1-7526ec288cb3']
  };

    return this.httpClient.post(environment.urlOneSignal , body, options ).subscribe();
  }
}
