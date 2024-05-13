import { Component, OnInit } from '@angular/core';
import { Fruta } from '../_modelo/Fruta';
import { FrutaService } from '../_servicio/fruta-servicio.service';
import { AltaFrutasComponent } from '../alta-frutas/alta-frutas.component';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-lista-frutas',
  standalone: true,
  imports: [ RouterModule, AltaFrutasComponent],
  templateUrl: './lista-frutas.component.html',
  styleUrl: './lista-frutas.component.css'
})
export class ListaFrutasComponent implements OnInit {

  frutas: Fruta[] = [];

  productoSeleccionado: Fruta | null = null;
  mostrar: boolean = false;

  constructor(private frutaService: FrutaService) {}

  ngOnInit(): void {
    this.actualizar();
  }



  eliminarProducto(id: number): void {
    this.frutaService.eliminarProducto(id).pipe(
        switchMap(async () => this.actualizar())
    ).subscribe();
}



  editarProducto(fruta: Fruta): void {
    this.productoSeleccionado = fruta;
    this.mostrar = true;
  }

  formu(): void {
    this.mostrar = !this.mostrar;
  }
  actualizar(): void {
    this.frutaService.obtenerProductos().subscribe((frutas: Fruta[]) => {
      this.frutas = frutas;
    });
  }

}