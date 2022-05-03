import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ProductsRoutingModule } from './products-routing.module';
import { ListaProductoComponent } from './pages/lista-producto/lista-producto.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { FormularioProductoComponent } from './pages/formulario-producto/formulario-producto.component';


@NgModule({
  declarations: [
    ListaProductoComponent,
    DetalleProductoComponent,
    FormularioProductoComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
