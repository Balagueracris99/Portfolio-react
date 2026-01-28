import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.about-content > *', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class AboutComponent {
  traits = [
    'PROBLEM SOLVER',
    'TEAM PLAYER',
    'CONTINUOUS LEARNER',
    'INNOVATION DRIVEN'
  ];

  stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Completed' },
    { number: '5+', label: 'Happy Clients' },
    { number: '12+', label: 'Technologies' }
  ];
}

