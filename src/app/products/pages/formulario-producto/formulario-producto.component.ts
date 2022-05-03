import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent implements OnInit {

  producto!: Producto;
  id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  constructor(private productoService: ProductoService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.id) {
      this.productoService.detail(this.id).subscribe({
        next: (resp) => {
          this.producto = resp;
          this.miFormulario.patchValue(this.producto);
        }
      })
    }
  }

  miFormulario = this.fb.group({
    nombre: ['',Validators.required],
    precio: ['',[Validators.required,Validators.min(0)]]
  })

  campoValido(campo: string){
    return this.miFormulario.controls[campo].valid &&
           this.miFormulario.controls[campo].touched;
  }

  campoNoValido(campo: string){
    return this.miFormulario.controls[campo].errors &&
           this.miFormulario.controls[campo].touched;
  }

  onSubmit(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.producto = this.miFormulario.value;
    if (this.id) {
      this.editar();
    }else{
      this.agregar();
    }
  }

  agregar(){
    this.productoService.save(this.producto).subscribe({
      next: (resp) => {
        this.toastr.success(resp.mensaje, 'Exito!');
        this.miFormulario.reset();
      },
      error: (err) => {
        this.toastr.error(err.error.mensaje, 'Error!');
      }
    });
  }

  editar(){
    this.productoService.update(this.id, this.producto).subscribe({
      next: (resp) => {
        this.toastr.success(resp.mensaje, 'Exito!');
      },
      error: (err) => {
        this.toastr.error(err.error.mensaje, 'Error!');
      }
    });
  }
}
