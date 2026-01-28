import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.service-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ServicesComponent {
  services = [
    {
      title: 'Desarrollo Web',
      description: 'Aplicaciones web personalizadas construidas con tecnologías modernas, enfocándose en rendimiento y experiencia de usuario.',
      icon: '🌐'
    },
    {
      title: 'Desarrollo Frontend',
      description: 'Interfaces de usuario hermosas y responsivas usando HTML5, CSS3, JavaScript y Angular.',
      icon: '💻'
    },
    {
      title: 'Desarrollo Backend',
      description: 'Soluciones robustas del lado del servidor con PHP, Node.js y sistemas de gestión de bases de datos.',
      icon: '⚙️'
    },
    {
      title: 'Diseño de Base de Datos',
      description: 'Arquitectura de base de datos eficiente y optimización para MySQL y MongoDB.',
      icon: '🗄️'
    },
    {
      title: 'Desarrollo de API',
      description: 'APIs RESTful y servicios de integración para intercambio de datos sin problemas.',
      icon: '🔗'
    },
    {
      title: 'Mantenimiento & Soporte',
      description: 'Mantenimiento continuo, actualizaciones y soporte técnico para aplicaciones existentes.',
      icon: '🔧'
    }
  ];
}



