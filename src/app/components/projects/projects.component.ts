import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Sitio Web Corporativo',
      description: 'Desarrollo e implementación del sitio web corporativo con PHP, MySQL, HTML, CSS y JavaScript. Incluye diseño de base de datos y formularios con medidas de seguridad.',
      image: '🌐',
      technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
      link: '#',
      github: '#'
    },
    {
      title: 'Aplicación Android',
      description: 'Aplicación móvil desarrollada con Android Studio y Firebase, implementando funcionalidades similares a aplicaciones de transporte.',
      image: '📱',
      technologies: ['Android Studio', 'Firebase', 'Java'],
      link: '#',
      github: '#'
    },
    {
      title: 'Sistema con Laravel',
      description: 'Aplicación web desarrollada con Laravel, implementando modelos, migraciones, rutas y vistas siguiendo las mejores prácticas del framework.',
      image: '🚀',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Blade'],
      link: '#',
      github: '#'
    },
    {
      title: 'Portfolio Personal',
      description: 'Sitio web personal responsive desarrollado con Angular, con animaciones modernas y diseño minimalista optimizado para GitHub Pages.',
      image: '💼',
      technologies: ['Angular', 'TypeScript', 'CSS3', 'GitHub Pages'],
      link: '#',
      github: '#'
    }
  ];
}

