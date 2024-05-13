import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Fruta } from '../_modelo/Fruta';
import { FrutaService } from '../_servicio/fruta-servicio.service';


@Component({
  selector: 'app-alta-frutas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-frutas.component.html',
  styleUrl: './alta-frutas.component.css'
})
export class AltaFrutasComponent{

  @Input() fruta: Fruta | null = null;


  @Output() formSubmitted = new EventEmitter<void>();



  productoForm: FormGroup;








  mostrar: boolean = true;

  constructor(
    private formulario: FormBuilder,
    private frutaService: FrutaService, 
    private router: Router
  ) {
    this.productoForm = this.formulario.group({
      idFruta: ['', [Validators.required]], 
      nombreFruta:  ['', [Validators.required]],  
      precioPorKilo:['', [Validators.required, Validators.minLength(1)]],  
      cantidadDisponible: ['', [Validators.required, Validators.minLength(2)]]
    });
  }


  ngOnChanges() {
    if (this.fruta) {
      this.productoForm.patchValue(this.fruta);
    }
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const fruta: Fruta = this.productoForm.value;
      if (this.fruta) {
        this.frutaService.actualizarProducto(fruta).subscribe(() => {
          this.productoForm.reset();
          this.formSubmitted.emit();
        });
      } else {
        this.frutaService.agregarProducto(fruta).subscribe(() => {
          this.productoForm.reset();
          this.formSubmitted.emit();
        });
      }
    } else {
      console.log('no válido');
    }
  }

  formu() {
    this.mostrar = !this.mostrar;
  }
}