import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReservationSearchFormComponent } from '../../shared/components/organism/reservation-search-form/reservation-search-form.component';
import { NgTemplateOutlet } from '@angular/common';
import { MyReservation, RoomReservation } from '../../core/interfaces/reservation.interfaces';
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
export class MyReservationsComponent {

  @ViewChild('reservEditTemplate') reservEditTemplate: TemplateRef<any> | undefined;

  public existingGuest: boolean = false;
  public reservation!: MyReservation;
  public data: DataSource[] = [];
  public displayedColumns: string[] = ['Habitación', 'Fecha', 'Estado', 'actions'];


  constructor(
    private loadingService: LoadingService,
    private dialogService: DialogService
  ){}

  async searchDocument(document: number){
    console.log(`Documento -> ${document}`);
    this.loadingService.spinnerShow();
    setTimeout(
      async () => {
        this.reservation = {
          user: getUsers()[0],
          roomReservation: getRoomReservation(15)
        }
        this.data = await this.mapReservationToDatasource(this.reservation.roomReservation);
        this.existingGuest = true;
        this.loadingService.spinnerHide();
      }, 1500
    )
  }

  async mapReservationToDatasource(roomReservation: RoomReservation[]): Promise<DataSource[]> {
    const dataForm: DateFormatPipe = new DateFormatPipe();
    return new Promise<DataSource[]>((resolve, reject) => {
      const dataSource: DataSource[] = roomReservation.map<DataSource>(rr => (
        {
          'Habitación': rr.room.name,
          'Fecha': `${dataForm.transform(rr.startDate, "DD/MM/YYYY") } - ${dataForm.transform(rr.endDate, "DD/MM/YYYY") }`,
          'Estado': rr.room.state ? 'Confirmado' : 'Cancelado',
          'actions': rr.room.state ?  [{title:'Cancelar', type: 'outline', size:"small"}, {title:'Modificar', type: 'flat', size:"small"}] : [],
          ...rr.room
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
        console.log(respt?.action)
        break;
      case('Modificar'): 
        await this.dialogService.openDialog(
          {
            title: '',
            width:'30.625rem',
            buttonsEnabled: false,
            templete: this.reservEditTemplate
          }
        )
        console.log('Dialog modificar fechas')
        break;
    }
  }

}
