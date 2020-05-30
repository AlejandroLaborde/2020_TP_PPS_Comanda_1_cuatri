import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage/storage';

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
  
} 
