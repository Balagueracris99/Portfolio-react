import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.hero-content > *', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(150, [
            animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ]),
        query('.hero-image-wrapper', [
          style({ opacity: 0, transform: 'translateX(50px) scale(0.9)' }),
          animate('1000ms ease-out', style({ opacity: 1, transform: 'translateX(0) scale(1)' }))
        ])
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  imageError = false;
  // Ruta de la imagen
  imageSrc = 'assets/profile-photo.jpg';

  ngOnInit() {
    // La imagen se cargará automáticamente desde assets
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onImageError() {
    this.imageError = true;
    this.imageSrc = this.getPlaceholderImage();
  }

  getPlaceholderImage(): string {
    // SVG placeholder con gradiente
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3NjRiYTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iUG9wcGlucywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI4MCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DQjwvdGV4dD48L3N2Zz4=';
  }
}

