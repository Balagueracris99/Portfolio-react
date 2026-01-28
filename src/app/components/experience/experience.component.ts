import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.experience-item', [
          style({ opacity: 0, transform: 'translateX(-30px)' }),
          stagger(150, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ExperienceComponent {
  experiences = [
    {
      title: 'Supervisor de Campo Fibra Óptica',
      company: 'TABASCO OC LLC SUCURSAL COLOMBIA – CLARO COLOMBIA',
      period: '07/2024 – 07/2025',
      description: 'Coordinación de cuadrillas de instalación y mantenimiento en proyectos de telecomunicaciones. Gestión y seguimiento de incidentes de red. Supervisión de proyectos garantizando cumplimiento en tiempos, calidad y presupuesto. Monitoreo de métricas operativas y elaboración de reportes de desempeño.',
      technologies: ['Gestión de Proyectos', 'Telecomunicaciones', 'Liderazgo']
    },
    {
      title: 'Tecnólogo Mantenimiento Telecomunicaciones',
      company: 'TABASCO OC LLC SUCURSAL COLOMBIA – CLARO COLOMBIA',
      period: '07/2023 - 07/2024',
      description: 'Ejecución y supervisión de requerimientos técnicos y correctivos en infraestructura de red. Configuración, diagnóstico y mantenimiento de equipos corporativos. Gestión y soporte en entornos MPLS y SD-WAN. Implementación de mejoras en procesos internos mediante herramientas digitales.',
      technologies: ['Redes', 'MPLS', 'SD-WAN', 'Soporte Técnico']
    },
    {
      title: 'Prácticas Ingeniería de Sistemas',
      company: 'HART INGENIERIA Y SUMINISTROS',
      period: '01/2023 - 06/2023',
      description: 'Desarrollo e implementación del sitio web corporativo con PHP, MySQL, HTML, CSS y JavaScript. Diseño de base de datos y formularios con medidas básicas de seguridad. Soporte, mantenimiento y optimización del sitio para mejorar rendimiento y usabilidad.',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript']
    }
  ];
}

