import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private productoService: ProductoService,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
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

    // this.productoService.save(this.producto).subscribe(data => {
    //   this.toastr.success(data.mensaje, 'Exito!');
    //   this.miFormulario.reset();
    // }, error: () => {
    //   this.toastr.error(error.mensaje, 'Error!');
    // });

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
}
