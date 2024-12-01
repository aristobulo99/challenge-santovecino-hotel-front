import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePickerComponent } from '../../molecule/date-picker/date-picker.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { ReservationService } from '../../../../core/services/reservation/reservation.service';
import { DataSource } from '../../../../core/interfaces/table.interfaces';
import { DateReservation } from '../../../../core/interfaces/reservation.interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { patchReservationDateRequest } from '../../../../store/actions/reservatio.action';

@Component({
  selector: 'app-reservation-edit-form',
  standalone: true,
  imports: [
    DatePickerComponent,
    ButtonComponent
  ],
  templateUrl: './reservation-edit-form.component.html',
  styleUrl: './reservation-edit-form.component.scss'
})
export class ReservationEditFormComponent implements OnChanges {

  @Input() optionData!: DataSource;

  public blockedDates: Date[] = [];
  public controlDate: FormGroup = new FormGroup(
    {
      start: new FormControl<Date | null>(null, [Validators.required]),
      end: new FormControl<Date | null>(null, [Validators.required]),
    },
  );

  constructor(
    private dialogService: DialogService,
    private reservationService: ReservationService,
    private store: Store<AppState>,
  ){}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if(changes['optionData']){
      await this.getBlockedDates(this.optionData['roomId'] as string);
    }
  }

  async getBlockedDates(roomId: string) : Promise<void>{
    this.blockedDates = await this.reservationService.getReservedDates(roomId);
  }

  async onConfirm(){
    
    if(!(this.controlDate.get('start')?.value && this.controlDate.get('end')?.value)){
      console.log('Debe establecer un rango')
      return;
    }
    const startDate = new Date(this.controlDate.get('start')?.value);
    const endDate = new Date(this.controlDate.get('end')?.value);

    startDate.setHours(0,0,0,0);
    endDate.setHours(23, 59, 59, 999);

    const dates: DateReservation = {
      startDate: startDate,
      endDate: endDate
    };

    console.log(this.optionData['id'])
    this.store.dispatch(patchReservationDateRequest({reservationId: this.optionData['id'] as string, dates: dates}))
    this.dialogService.closedAll();

  }

  onCancel(){
    this.dialogService.closedAll();
  }


}
