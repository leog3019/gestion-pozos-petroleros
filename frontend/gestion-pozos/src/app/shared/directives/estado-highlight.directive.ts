import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEstadoHighlight]',
  standalone: true
})
export class EstadoHighlightDirective implements OnInit {
  @Input('appEstadoHighlight') estado!: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setStyle();
  }

  private setStyle() {
    const element = this.el.nativeElement;
    
    // Limpiar clases anteriores
    this.renderer.removeClass(element, 'estado-activo-bg');
    this.renderer.removeClass(element, 'estado-inactivo-bg');
    this.renderer.removeClass(element, 'estado-mantenimiento-bg');
    
    // Aplicar estilo según el estado
    switch (this.estado?.toLowerCase()) {
      case 'activo':
        this.renderer.addClass(element, 'estado-activo-bg');
        this.renderer.setStyle(element, 'border-left', '4px solid #28a745');
        this.renderer.setStyle(element, 'background-color', '#f8fff9');
        break;
      case 'inactivo':
        this.renderer.addClass(element, 'estado-inactivo-bg');
        this.renderer.setStyle(element, 'border-left', '4px solid #dc3545');
        this.renderer.setStyle(element, 'background-color', '#fff8f8');
        break;
      case 'mantenimiento':
        this.renderer.addClass(element, 'estado-mantenimiento-bg');
        this.renderer.setStyle(element, 'border-left', '4px solid #ffc107');
        this.renderer.setStyle(element, 'background-color', '#fffdf0');
        break;
      default:
        this.renderer.setStyle(element, 'border-left', '4px solid #6c757d');
        this.renderer.setStyle(element, 'background-color', '#f8f9fa');
        break;
    }
  }
}
