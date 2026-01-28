import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.course-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class CoursesComponent {
  courses = [
    {
      title: 'Fundamentos de Linux',
      platform: 'Learning Quest',
      date: 'Jul. 2025',
      category: 'Sistemas Operativos'
    },
    {
      title: 'Fundamentos del soporte técnico',
      platform: 'United Latino Students Association',
      date: 'Mar. 2025',
      category: 'Soporte Técnico'
    },
    {
      title: 'Fundamentos de Agilidad: Primeros pasos para la transformación ágil',
      platform: 'Alura Latam',
      date: 'Jun. 2023',
      category: 'Metodologías Ágiles'
    },
    {
      title: 'Formación Desarrollo Personal G5 – ONE',
      platform: 'Alura Latam',
      date: 'May. 2023',
      category: 'Desarrollo Personal'
    },
    {
      title: 'Git y GitHub: controle y comparta su código',
      platform: 'Alura Latam',
      date: 'Abr. 2023',
      category: 'Control de Versiones'
    },
    {
      title: 'HTML5 y CSS3 parte 1: Mi primera página',
      platform: 'Alura Latam',
      date: 'Abr. 2023',
      category: 'Frontend'
    },
    {
      title: 'HTML5 y CSS3 parte 2: Posicionamiento, listas y navegación',
      platform: 'Alura Latam',
      date: 'Abr. 2023',
      category: 'Frontend'
    },
    {
      title: 'HTML5 y CSS3 parte 3: Trabajando con formularios y tablas',
      platform: 'Alura Latam',
      date: 'Abr. 2023',
      category: 'Frontend'
    },
    {
      title: 'Lógica de programación: Conceptos',
      platform: 'Alura Latam',
      date: 'Abr. 2023',
      category: 'Programación'
    },
    {
      title: 'Lógica de programación: Practicando con juegos y animaciones',
      platform: 'Alura Latam',
      date: 'Abr. 2023',
      category: 'Programación'
    },
    {
      title: 'Lógica de programación: Primeros pasos',
      platform: 'Alura Latam',
      date: 'Abr. 2023',
      category: 'Programación'
    },
    {
      title: 'Crea una App como UBER utilizando Android Studio y Firebase',
      platform: 'Udemy',
      date: 'Mar. 2022',
      category: 'Desarrollo Móvil'
    },
    {
      title: 'Aprende Laravel - Modelos, Migraciones, Rutas, Vistas, etc.',
      platform: 'Udemy',
      date: 'May. 2021',
      category: 'Backend'
    },
    {
      title: 'Java para principiantes',
      platform: 'Udemy',
      date: 'Sept. 2020',
      category: 'Programación'
    },
    {
      title: 'Aprende PHP y MySQLi, conceptos básicos para principiantes',
      platform: 'Udemy',
      date: 'Ago. 2020',
      category: 'Backend'
    },
    {
      title: 'JavaScript',
      platform: 'Udemy',
      date: 'Abr. 2020',
      category: 'Frontend'
    },
    {
      title: 'Diseño web - Aprende creando un sitio web paso a paso',
      platform: 'Udemy',
      date: 'Feb. 2019',
      category: 'Diseño Web'
    }
  ];

  getCoursesByCategory() {
    const categories: { [key: string]: any[] } = {};
    this.courses.forEach(course => {
      if (!categories[course.category]) {
        categories[course.category] = [];
      }
      categories[course.category].push(course);
    });
    return Object.keys(categories).map(category => ({
      category,
      courses: categories[category]
    }));
  }
}



