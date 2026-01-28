import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit, AfterViewInit {
  isLoading = true;
  minLoadTime = 1500; // Tiempo mínimo de carga (1.5 segundos)
  startTime = Date.now();

  ngOnInit() {
    this.startTime = Date.now();
  }

  ngAfterViewInit() {
    // Esperar a que la página esté completamente cargada
    if (document.readyState === 'complete') {
      this.hideLoader();
    } else {
      window.addEventListener('load', () => {
        this.hideLoader();
      });
      
      // Fallback: ocultar después de un tiempo máximo
      setTimeout(() => {
        this.hideLoader();
      }, 3000);
    }
  }

  hideLoader() {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.minLoadTime - elapsed);
    
    setTimeout(() => {
      this.isLoading = false;
      // Remover el loader del DOM después de la animación
      setTimeout(() => {
        const loader = document.querySelector('app-loader');
        if (loader) {
          loader.remove();
        }
      }, 500);
    }, remaining);
  }
}

