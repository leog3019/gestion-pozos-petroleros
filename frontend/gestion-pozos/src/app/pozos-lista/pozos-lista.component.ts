import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PozoService } from '../pozo.service';
import { ProduccionUnidadesPipe } from '../shared/pipes/produccion-unidades.pipe';
import { EstadoHighlightDirective } from '../shared/directives/estado-highlight.directive';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pozos-lista',
  standalone: true,
  imports: [CommonModule, ProduccionUnidadesPipe, EstadoHighlightDirective],
  templateUrl: './pozos-lista.component.html',
  styleUrls: ['./pozos-lista.component.scss']
})
export class PozoListaComponent implements OnInit {
  pozos: any[] = [];
  loading = true;
  error = false;
  unidadProduccion: 'barriles' | 'galones' | 'litros' = 'barriles';
  
  // Observable para manejar datos de forma reactiva
  private pozosSubject = new BehaviorSubject<any[]>([]);
  pozos$ = this.pozosSubject.asObservable();

  constructor(private pozoService: PozoService) {}

  ngOnInit() {
    this.loadPozos();
  }

  loadPozos() {
    this.loading = true;
    this.error = false;
    
    this.pozoService.getPozos().subscribe({
      next: (data) => {
        this.pozos = data;
        this.pozosSubject.next(data); // Emitir datos a través del observable
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar pozos:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  toggleEstado(pozo: any) {
    const nuevoEstado = pozo.estado === 'activo' ? 'inactivo' : 'activo';
    
    this.pozoService.updatePozoState(pozo.id, nuevoEstado).subscribe({
      next: (pozoActualizado) => {
        // Actualizar el pozo en la lista local
        const index = this.pozos.findIndex(p => p.id === pozo.id);
        if (index !== -1) {
          this.pozos[index] = pozoActualizado;
          this.pozosSubject.next([...this.pozos]); // Emitir nueva lista
        }
        console.log(`Estado del pozo ${pozo.nombre} cambiado a ${nuevoEstado}`);
      },
      error: (err) => {
        console.error('Error al cambiar estado del pozo:', err);
        alert('Error al cambiar el estado del pozo');
      }
    });
  }

  cambiarUnidad(nuevaUnidad: 'barriles' | 'galones' | 'litros') {
    this.unidadProduccion = nuevaUnidad;
  }

  getEstadoClass(estado: string): string {
    switch(estado?.toLowerCase()) {
      case 'activo': return 'estado-activo';
      case 'inactivo': return 'estado-inactivo';
      case 'mantenimiento': return 'estado-mantenimiento';
      default: return '';
    }
  }
}
