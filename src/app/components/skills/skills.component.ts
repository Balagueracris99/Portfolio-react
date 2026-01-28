import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.skill-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class SkillsComponent {
  skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', level: 95, icon: '📄' },
        { name: 'CSS3', level: 92, icon: '🎨' },
        { name: 'JavaScript', level: 90, icon: '💛' },
        { name: 'Angular', level: 85, icon: '⚡' }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'PHP', level: 88, icon: '🐘' },
        { name: 'Node.js', level: 75, icon: '🟢' },
        { name: 'REST APIs', level: 85, icon: '🔗' },
        { name: 'Express.js', level: 70, icon: '🚀' }
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MySQL', level: 90, icon: '🗄️' },
        { name: 'MongoDB', level: 75, icon: '🍃' },
        { name: 'SQL', level: 85, icon: '📊' },
        { name: 'Database Design', level: 82, icon: '🗃️' }
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90, icon: '🔀' },
        { name: 'GitHub', level: 88, icon: '🐙' },
        { name: 'VS Code', level: 92, icon: '💻' },
        { name: 'Scrum', level: 85, icon: '📋' }
      ]
    }
  ];
}

