import { Component, Input } from '@angular/core';
import { SimpleCardComponent } from '../../atom/simple-card/simple-card.component';

@Component({
  selector: 'app-loading-card',
  standalone: true,
  imports: [SimpleCardComponent],
  templateUrl: './loading-card.component.html',
  styleUrl: './loading-card.component.scss'
})
export class LoadingCardComponent {

  @Input() numberCards!: number;

}
