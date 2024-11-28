import { Component } from '@angular/core';
import { CircularCardComponent } from '../../shared/components/atom/circular-card/circular-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CircularCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
