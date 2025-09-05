import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PozoService } from '../pozo.service';

@Component({
  selector: 'app-agregar-pozo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-pozo.component.html',
  styleUrls: ['./agregar-pozo.component.scss']
})
export class AgregarPozoComponent {
  pozo = {
    nombre: '',
    ubicacion: '',
    produccion_diaria: 0,
    estado: 'activo'
  };
  
  loading = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(private pozoService: PozoService) {}

  onSubmit() {
    // Validaciones básicas
    if (!this.pozo.nombre.trim()) {
      this.mostrarMensaje('El nombre del pozo es requerido', 'error');
      return;
    }
    
    if (!this.pozo.ubicacion.trim()) {
      this.mostrarMensaje('La ubicación es requerida', 'error');
      return;
    }
    
    if (this.pozo.produccion_diaria <= 0) {
      this.mostrarMensaje('La producción diaria debe ser mayor a 0', 'error');
      return;
    }

    this.loading = true;
    this.mensaje = '';

    this.pozoService.createPozo(this.pozo).subscribe({
      next: (nuevoPozo) => {
        this.mostrarMensaje('Pozo agregado exitosamente', 'success');
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al agregar pozo:', err);
        this.mostrarMensaje('Error al agregar el pozo', 'error');
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.pozo = {
      nombre: '',
      ubicacion: '',
      produccion_diaria: 0,
      estado: 'activo'
    };
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 5000);
  }
}
