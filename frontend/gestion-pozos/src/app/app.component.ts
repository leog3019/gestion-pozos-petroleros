import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PozoListaComponent } from './pozos-lista/pozos-lista.component';
import { AgregarPozoComponent } from './agregar-pozo/agregar-pozo.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PozoListaComponent, AgregarPozoComponent, EstadisticasComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion-pozos';
}
