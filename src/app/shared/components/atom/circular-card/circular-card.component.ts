import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading/loading.service';

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
    private router: Router,
    private loadingService: LoadingService
  ){}

  goAvailability(){
    this.loadingService.spinnerShow();
    this.router.navigate(['/availability']);
  }

}
