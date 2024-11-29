import { Component, Input } from '@angular/core';
import { Room } from '../../../../core/interfaces/room.interfaces';
import { SimpleCardComponent } from '../../atom/simple-card/simple-card.component';
import { IconComponent } from '../../atom/icon/icon.component';
import { ButtonComponent } from '../../atom/button/button.component';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [
    SimpleCardComponent,
    IconComponent,
    ButtonComponent
  ],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {

  @Input() dataRoom!: Room;

}
