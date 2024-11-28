import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CircularCardComponent } from './shared/components/atom/circular-card/circular-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CircularCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'challenge-santovecino-hotel';
}
