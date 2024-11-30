import { Component, OnInit } from '@angular/core';
import { SimpleCardComponent } from '../../shared/components/atom/simple-card/simple-card.component';
import { LoadingCardComponent } from '../../shared/components/molecule/loading-card/loading-card.component';
import { LoadingService } from '../../core/services/loading/loading.service';
import { RoomCardComponent } from '../../shared/components/molecule/room-card/room-card.component';
import { Room } from '../../core/interfaces/room.interfaces';
import { getRoomList } from '../../core/mocks/room.mock';
import { ReservationFormComponent } from '../../shared/components/molecule/reservation-form/reservation-form.component';
import { TableComponent } from '../../shared/components/molecule/table/table.component';
import { DataSource } from '../../core/interfaces/table.interfaces';
import { getDataSource } from '../../core/mocks/table.mocks';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [
    LoadingCardComponent,
    RoomCardComponent,
    ReservationFormComponent,
  ],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss'
})
export class AvailabilityComponent implements OnInit{

  public loadingCard: boolean = true;
  public dataRoom: Room[] = [];

  constructor(
    private loadingService: LoadingService
  ){

  }

  ngOnInit(): void {
    this.dataRoom = getRoomList();
   setTimeout(
    () => {
      this.loadingCard = false;
      this.loadingService.spinnerHide();
    }, 2000
   )    
  }
}
