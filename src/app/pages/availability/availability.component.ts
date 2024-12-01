import { Component, OnInit } from '@angular/core';
import { LoadingCardComponent } from '../../shared/components/molecule/loading-card/loading-card.component';
import { LoadingService } from '../../core/services/loading/loading.service';
import { RoomCardComponent } from '../../shared/components/molecule/room-card/room-card.component';
import { Room } from '../../core/interfaces/room.interfaces';
import { getRoomList } from '../../core/mocks/room.mock';
import { ReservationFormComponent } from '../../shared/components/organism/reservation-form/reservation-form.component';
import { RoomService } from '../../core/services/room/room.service';
import { ReservationService } from '../../core/services/reservation/reservation.service';

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
    private loadingService: LoadingService,
    private roomService: RoomService,
    private reservationService: ReservationService
  ){

  }

  async ngOnInit(): Promise<void> {
    setTimeout(
      async() => {
        await this.getAllRoom();
      }, 1500
    )
  }

  async getAllRoom(){
    try{
      this.dataRoom = await this.roomService.getRooms();
      await this.availabilityStatusValidation();
    }catch(e){
      console.error(e);
    }finally {
      this.loadingCard = false;
      this.loadingService.spinnerHide();
    }
  }

  async availabilityStatusValidation(){
    this.dataRoom.forEach(
      async (room) => {
        const dates: Date[] = await this.reservationService.getReservedDates(room.id);
        room.state = dates.length <= 30;
      }
    )
  }
}
