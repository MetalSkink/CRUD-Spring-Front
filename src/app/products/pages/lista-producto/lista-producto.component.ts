import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productoService: ProductoService,
              private toastr: ToastrService) {
    this.cargarProductos();
  }

  ngOnInit(): void {
  }

  cargarProductos(){
    this.productoService.lista().subscribe(data => {
      this.productos = data;
    })
  }

  borrarProducto(id: number) {
    this.productoService.delete(id).subscribe({
      next: (resp) => {
        this.toastr.success(resp.mensaje, 'Exito!');
        this.cargarProductos();
      },
      error: (err) => {
        this.toastr.error(err.error.mensaje, 'Error!');
      }
    });
  }

}
