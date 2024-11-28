import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circular-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './circular-card.component.html',
  styleUrl: './circular-card.component.scss'
})
export class CircularCardComponent {

  @Input() title!: string;
  
  constructor(
    private router: Router
  ){}

  goAvailability(){
    this.router.navigate(['/availability'])
  }

}
