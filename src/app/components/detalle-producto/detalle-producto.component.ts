import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {

  @Input() producto:Producto
  constructor() { }

  ngOnInit() {}

}
