import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nombreImagen: string;
  dbRef: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private db2: AngularFireDatabase,
    private fStorage: AngularFireStorage ) {

      this.dbRef = this.db.collection('files');
  }

  guardarEnStorage( datosImagen ): AngularFireUploadTask {
    // this.nombreImagen = this.generarNombreFoto();
    this.nombreImagen = 'imagen de prueba';
    const imagen = `data:image/jpeg;base64,${datosImagen}`;
    return this.fStorage.ref(`files/${this.nombreImagen}`).putString(imagen, 'data_url');
  }

  // guardarEnBaseDeDatos( metaData, urlImagen, categoria ) {
  //   return this.dbRef.doc( this.nombreImagen ).set({
  //     votos: new Array(),
  //     url: urlImagen,
  //     creada: metaData.timeCreated,
  //     fullPath: metaData.fullPath,
  //     contentType: metaData.contentType,
  //     usuario: 'usuario',
  //     mail: 'usuario@mail.com',
  //     tipo: categoria === 0 ? 'linda' : 'fea',
  //   });
  // }

  generarNombreFoto() {
    return 'pepe';
  }
}
 