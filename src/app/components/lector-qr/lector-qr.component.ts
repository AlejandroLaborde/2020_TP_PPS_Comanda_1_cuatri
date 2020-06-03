import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.component.html',
  styleUrls: ['./lector-qr.component.scss'],
})
export class LectorQRComponent implements OnInit {

  
  @Output() enviarDatos = new EventEmitter<any>();
  datoEscaneado: any;

  constructor(private scanner: BarcodeScanner, private toastService: ToastService) { }

  escanearQr() {
    this.scanner.scan().then(data => {
        this.datoEscaneado = data;
        this.enviarDatos.emit(this.datoEscaneado);
        
      })
      .catch(err => {
        console.log("Error: ", err);
        this.toastService.errorToast('Codigo QR inválido');
      });
  }

  
  ngOnInit() {}

}
