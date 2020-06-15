import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-lector-dni',
  templateUrl: './lector-dni.component.html',
  styleUrls: ['./lector-dni.component.scss'],
})
export class LectorDniComponent implements OnInit {

  @Output() enviarDatos = new EventEmitter<any>();
  datoEscaneado: any;

  constructor(private scanner: BarcodeScanner, private toastService: ToastService) { }

   LeerDni() {

    const opciones: BarcodeScannerOptions = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      prompt: "Scanee el DNI", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    }

    this.scanner.scan(opciones).then(data => {
      this.datoEscaneado = data;
        this.enviarDatos.emit(this.datoEscaneado);
      

    }).catch(err => {
      console.log('Error', err);
      this.toastService.errorToast('Codigo QR inválido');
    });

  }
  
  ngOnInit() {}

}
