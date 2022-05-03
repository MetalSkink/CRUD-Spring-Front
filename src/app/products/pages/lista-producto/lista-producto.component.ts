import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {
    this.productoService.lista().subscribe(data => {
      this.productos = data;
    })
   }

  ngOnInit(): void {
  }

  borrarProducto(id: number) {
    console.log('borrando producto con id: ' + id);
  }

}
