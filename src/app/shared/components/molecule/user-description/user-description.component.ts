import { Component, Input } from '@angular/core';
import { User } from '../../../../core/interfaces/users.interfaces';
import { SimpleCardComponent } from '../../atom/simple-card/simple-card.component';

@Component({
  selector: 'app-user-description',
  standalone: true,
  imports: [
    SimpleCardComponent
  ],
  templateUrl: './user-description.component.html',
  styleUrl: './user-description.component.scss'
})
export class UserDescriptionComponent {

  @Input() user!: User;

}
