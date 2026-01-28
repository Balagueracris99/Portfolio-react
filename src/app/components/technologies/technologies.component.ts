import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.tech-item', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(50, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ])
      ])
    ])
  ]
})
export class TechnologiesComponent {
  technologies = [
    { name: 'HTML5', icon: '📄' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: '💛' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Angular', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express.js', icon: '🚀' },
    { name: 'MySQL', icon: '🗄️' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Git', icon: '🔀' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'VS Code', icon: '💻' },
    { name: 'Figma', icon: '🎨' },
    { name: 'XAMPP', icon: '🔧' },
    { name: 'Scrum', icon: '📋' },
    { name: 'REST API', icon: '🔗' }
  ];
}



