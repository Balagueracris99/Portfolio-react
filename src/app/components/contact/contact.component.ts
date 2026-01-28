import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/cristhian-balaguera-barrios/' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/Balagueracris99' },
    { name: 'Email', icon: '📧', url: 'mailto:cbalaguera177@gmail.com' },
    { name: 'Teléfono', icon: '📱', url: 'tel:+573046676878' }
  ];

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    this.contactForm = { name: '', email: '', message: '' };
  }
}

