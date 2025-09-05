import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PozoService } from '../pozo.service';
import { ProduccionUnidadesPipe } from '../shared/pipes/produccion-unidades.pipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, ProduccionUnidadesPipe],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  stats = {
    totalPozos: 0,
    pozosActivos: 0,
    pozosInactivos: 0,
    pozosMantenimiento: 0,
    porcentajeActivos: 0,
    porcentajeInactivos: 0,
    produccionTotal: 0,
    promedioProduccion: 0
  };
  
  loading = true;
  error = false;
  
  // Observable para estadísticas reactivas como especifica el PDF
  estadisticas$: Observable<any> | undefined;

  constructor(private pozoService: PozoService) {}

  ngOnInit() {
    this.loadEstadisticas();
    this.setupObservables();
  }

  setupObservables() {
    // Crear observable reactivo para las estadísticas
    this.estadisticas$ = this.pozoService.getPozos().pipe(
      map(pozos => this.calcularEstadisticasReactivas(pozos))
    );
  }

  loadEstadisticas() {
    this.loading = true;
    this.error = false;
    
    this.pozoService.getPozos().subscribe({
      next: (pozos) => {
        this.calcularEstadisticas(pozos);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  calcularEstadisticas(pozos: any[]) {
    this.stats.totalPozos = pozos.length;
    this.stats.pozosActivos = pozos.filter(p => p.estado === 'activo').length;
    this.stats.pozosInactivos = pozos.filter(p => p.estado === 'inactivo').length;
    this.stats.pozosMantenimiento = pozos.filter(p => p.estado === 'mantenimiento').length;
    
    // Calcular porcentajes como especifica el PDF
    this.stats.porcentajeActivos = this.stats.totalPozos > 0 
      ? (this.stats.pozosActivos / this.stats.totalPozos) * 100 
      : 0;
    this.stats.porcentajeInactivos = this.stats.totalPozos > 0 
      ? (this.stats.pozosInactivos / this.stats.totalPozos) * 100 
      : 0;
    
    // Calcular producción total (solo pozos activos) como especifica el PDF
    this.stats.produccionTotal = pozos
      .filter(p => p.estado === 'activo')
      .reduce((total, pozo) => total + Number(pozo.produccion_diaria || 0), 0);
    
    // Calcular promedio de producción
    this.stats.promedioProduccion = this.stats.pozosActivos > 0 
      ? this.stats.produccionTotal / this.stats.pozosActivos 
      : 0;
  }

  calcularEstadisticasReactivas(pozos: any[]) {
    const totalPozos = pozos.length;
    const pozosActivos = pozos.filter(p => p.estado === 'activo').length;
    const pozosInactivos = pozos.filter(p => p.estado === 'inactivo').length;
    const produccionTotal = pozos
      .filter(p => p.estado === 'activo')
      .reduce((total, pozo) => total + Number(pozo.produccion_diaria || 0), 0);
    
    return {
      totalPozos,
      pozosActivos,
      pozosInactivos,
      porcentajeActivos: totalPozos > 0 ? (pozosActivos / totalPozos) * 100 : 0,
      porcentajeInactivos: totalPozos > 0 ? (pozosInactivos / totalPozos) * 100 : 0,
      produccionTotal,
      promedioProduccion: pozosActivos > 0 ? produccionTotal / pozosActivos : 0
    };
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('es-ES').format(Math.round(num));
  }

  formatPercentage(num: number): string {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(num);
  }
}
