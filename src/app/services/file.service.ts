import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) { 

  }

  public subirArchivo(nombreArchivo: string, datos: any,metadata:any) {
    return this.storage.upload(nombreArchivo, datos, {customMetadata:metadata});
  }
 
  public referenciaCloudStorage(nombreArchivo: string) {
        return this.storage.ref(nombreArchivo).getDownloadURL();
  }

  public guardarEnStorage( datosImagen, nombreImagen ): AngularFireUploadTask {
    const imagen = `data:image/jpeg;base64,${datosImagen}`;
    return this.storage.ref( nombreImagen ).putString(imagen, 'data_url');
  }
}