import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Fruta } from '../_modelo/Fruta';

@Injectable({
  providedIn: 'root'
})
export class FrutaService {


  private frutasSubject: BehaviorSubject<Fruta[]> = new BehaviorSubject<Fruta[]>([]);


  
  frutas: Observable<Fruta[]> = this.frutasSubject.asObservable();

  agregarProducto(fruta: Fruta): Observable<void> {
    const frutas = this.frutasSubject.getValue();
    frutas.push(fruta);
    this.frutasSubject.next(frutas);
    return of(undefined);
  }

  eliminarProducto(id: number): Observable<void> {
    const frutas = this.frutasSubject.getValue();
    const productosActualizados = frutas.filter(fruta => fruta.idFruta !== id);
    this.frutasSubject.next(productosActualizados);
    return of(undefined);
  }

  actualizarProducto(fruta: Fruta): Observable<void> {
    const frutas = this.frutasSubject.getValue();
    const index = frutas.findIndex(p => p.idFruta === fruta.idFruta);
    if (index !== -1) {
      frutas[index] = fruta;
      this.frutasSubject.next(frutas);
    }
    return of(undefined);
  }

  obtenerProductos(): Observable<Fruta[]> {
    return this.frutas;
  }

}