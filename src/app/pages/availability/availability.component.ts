import { Component } from '@angular/core';
import { SimpleCardComponent } from '../../shared/components/atom/simple-card/simple-card.component';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [SimpleCardComponent],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss'
})
export class AvailabilityComponent {

}
