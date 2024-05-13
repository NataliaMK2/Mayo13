import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaFrutasComponent } from './lista-frutas/lista-frutas.component';
import { AltaFrutasComponent } from './alta-frutas/alta-frutas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaFrutasComponent,AltaFrutasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mayo13';
}
