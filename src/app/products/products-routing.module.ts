import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { FormularioProductoComponent } from './pages/formulario-producto/formulario-producto.component';
import { ListaProductoComponent } from './pages/lista-producto/lista-producto.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'listado', component: ListaProductoComponent},
      {path: 'detalle/:id', component: DetalleProductoComponent},
      {path: 'nuevo', component: FormularioProductoComponent },
      {path: 'editar/:id', component: FormularioProductoComponent },
      {path: '**', redirectTo: 'listado'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
