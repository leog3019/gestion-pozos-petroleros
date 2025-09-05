import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'produccionUnidades',
  standalone: true
})
export class ProduccionUnidadesPipe implements PipeTransform {

  transform(value: number, unidad: 'barriles' | 'galones' | 'litros' = 'barriles'): string {
    if (!value || value === 0) return '0 bbl';
    
    let convertedValue: number;
    let unit: string;
    
    switch (unidad) {
      case 'galones':
        convertedValue = value * 42; // 1 barril = 42 galones
        unit = 'gal';
        break;
      case 'litros':
        convertedValue = value * 158.987; // 1 barril = 158.987 litros
        unit = 'L';
        break;
      case 'barriles':
      default:
        convertedValue = value;
        unit = 'bbl';
        break;
    }
    
    // Formatear el número con separadores de miles
    const formatted = new Intl.NumberFormat('es-ES', {
      maximumFractionDigits: 2
    }).format(convertedValue);
    
    return `${formatted} ${unit}`;
  }
}
