import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ReservationSearchFormComponent } from '../../shared/components/organism/reservation-search-form/reservation-search-form.component';
import { NgTemplateOutlet } from '@angular/common';
import { MyReservation, Reservation, RoomReservation } from '../../core/interfaces/reservation.interfaces';
import { getUsers } from '../../core/mocks/user.mock';
import { getRoomReservation } from '../../core/mocks/reservation.mock';
import { LoadingService } from '../../core/services/loading/loading.service';
import { UserDescriptionComponent } from '../../shared/components/molecule/user-description/user-description.component';
import { DataSource } from '../../core/interfaces/table.interfaces';
import { DateFormatPipe } from '../../shared/pipe/date-format/date-format.pipe';
import { TableComponent } from '../../shared/components/molecule/table/table.component';
import { S } from '@angular/cdk/keycodes';
import { DialogService } from '../../core/services/dialog/dialog.service';
import { ReservationEditFormComponent } from '../../shared/components/organism/reservation-edit-form/reservation-edit-form.component';
import { UserService } from '../../core/services/user/user.service';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { User } from '../../core/interfaces/users.interfaces';
import { RoomService } from '../../core/services/room/room.service';
import { Room } from '../../core/interfaces/room.interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Subject, takeUntil } from 'rxjs';
import { getReservationByUserIdReques, patchReservationStateRequest } from '../../store/actions/reservatio.action';
import { selectorReservations } from '../../store/selectors/reservation.selector';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [
    ReservationSearchFormComponent,
    NgTemplateOutlet,
    UserDescriptionComponent,
    TableComponent,
    ReservationEditFormComponent
  ],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})
export class MyReservationsComponent implements OnDestroy {

  @ViewChild('reservEditTemplate') reservEditTemplate: TemplateRef<any> | undefined;

  public existingGuest: boolean = false;
  public reservation!: MyReservation;
  public data: DataSource[] = [];
  public displayedColumns: string[] = ['Habitación', 'Fecha', 'Estado', 'actions'];
  public unsubscribe$: Subject<void> = new Subject<void>();
  public optionData!: DataSource;


  constructor(
    private store: Store<AppState>,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private userService: UserService,
    private reservationService: ReservationService,
    private roomService: RoomService
  ){}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async searchDocument(document: number){
    this.loadingService.spinnerShow();
    try{

      const dataUser: User[] = await this.userService.getUserByDocument(document);
      if(dataUser.length > 0){
        
        this.store.dispatch(getReservationByUserIdReques({userId: dataUser[0].id}));

        this.store.select(selectorReservations)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe( async (dataRoomReserv) => {
          const dataRoom: Room[] = [];
          let controlKey: {[key: string]: Room} = {};
          await Promise.all(
            dataRoomReserv.map(async (resetv) => {
                const room: Room[] = await this.roomService.getRoomById(resetv.roomId);
                if (!controlKey[room[0].id]) {
                    controlKey[room[0].id] = room[0];
                }
            })
          )
          dataRoom.push(...Object.values(controlKey));
          const roomReservation: RoomReservation[] = this.reservationService.mapMyReservation(dataRoomReserv, dataRoom);
          this.reservation = {
            user: dataUser[0],
            roomReservation: [...roomReservation]
          }
          this.data = await this.mapReservationToDatasource([...roomReservation]);
          this.existingGuest = true;
        })
      }
    }catch(e){
      console.error(e);
    }finally{
      this.loadingService.spinnerHide();
    }
  }

  async mapReservationToDatasource(roomReservation: RoomReservation[]): Promise<DataSource[]> {
    const dataForm: DateFormatPipe = new DateFormatPipe();
    return new Promise<DataSource[]>((resolve, reject) => {
      const dataSource: DataSource[] = roomReservation.map<DataSource>(rr => (
        {
          'id': rr.id,
          'roomId': rr.room.id,
          'state': rr.state,
          'Habitación': rr.room.name,
          'Fecha': `${dataForm.transform(rr.startDate, "DD/MM/YYYY") } - ${dataForm.transform(rr.endDate, "DD/MM/YYYY") }`,
          'Estado': rr.state ? 'Confirmado' : 'Cancelado',
          'actions': rr.state ?  [{title:'Cancelar', type: 'outline', size:"small"}, {title:'Modificar', type: 'flat', size:"small"}] : [],
        }
      ));
      resolve(dataSource);
    });
  }

  async optionEvent(option: {action: string, data: DataSource}){

    switch(option.action){
      case('Cancelar'): 
        const respt = await this.dialogService.openDialog(
          {
            title: 'Cancelar Reserva',
            text: 'Esta acción cancelará la reserva de la habitación. Este cambio no puede deshacerse.',
            width: '25rem',
            buttonsEnabled: true,
            flexDirectionButton: 'row',
            nameAcceptButton: 'Confirmar',
            nameCancelButton: 'Cancelar'
          }
        )
        if(respt?.action === 'confirm'){
          this.store.dispatch(patchReservationStateRequest({reservationId: option.data['id'] as string, state: false}))
        }
        break;
      case('Modificar'): 
        this.optionData = option.data;
        await this.dialogService.openDialog(
          {
            title: '',
            width:'30.625rem',
            buttonsEnabled: false,
            templete: this.reservEditTemplate
          }
        )
        break;
    }
  }

}
