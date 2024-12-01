import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingCardComponent } from '../../shared/components/molecule/loading-card/loading-card.component';
import { LoadingService } from '../../core/services/loading/loading.service';
import { RoomCardComponent } from '../../shared/components/molecule/room-card/room-card.component';
import { Room } from '../../core/interfaces/room.interfaces';
import { getRoomList } from '../../core/mocks/room.mock';
import { ReservationFormComponent } from '../../shared/components/organism/reservation-form/reservation-form.component';
import { RoomService } from '../../core/services/room/room.service';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getAllRoomRequest } from '../../store/actions/room.action';
import { Subject, takeUntil } from 'rxjs';
import { selectorRoom } from '../../store/selectors/room.selector';

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
export class AvailabilityComponent implements OnInit, OnDestroy{

  public loadingCard: boolean = true;
  public dataRoom: Room[] = [];
  public unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private loadingService: LoadingService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private store: Store<AppState>
  ){

  }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(getAllRoomRequest());
    setTimeout(
      async() => {
        this.getAllRoom();
      }, 1500
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async getAllRoom(){
    this.store.select(selectorRoom)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(async (rooms) => {
          try{
            this.loadingCard = true;
            this.dataRoom = [...rooms];
            await this.availabilityStatusValidation();
          }catch(e){
            console.error(e);
          }finally {
            this.loadingCard = false;
            this.loadingService.spinnerHide();
          }
        })
    
  }

  async availabilityStatusValidation(){
    const newRoom = await Promise.all(
      this.dataRoom.map(async (room) => {
        const dates: Date[] = await this.reservationService.getReservedDates(room.id);
        return { ...room, state: dates.length < 30 };
      })
    );
    this.dataRoom = newRoom;
  }
}
