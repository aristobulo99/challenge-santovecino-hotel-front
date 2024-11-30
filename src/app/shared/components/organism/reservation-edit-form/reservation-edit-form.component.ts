import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePickerComponent } from '../../molecule/date-picker/date-picker.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';

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
export class ReservationEditFormComponent {

  public controlDate: FormGroup = new FormGroup(
    {
      start: new FormControl<Date | null>(null, [Validators.required]),
      end: new FormControl<Date | null>(null, [Validators.required]),
    },
  );

  constructor(
    private dialogService: DialogService
  ){}

  onConfirm(){
    this.dialogService.closedAll()
  }

  onCancel(){
    this.dialogService.closedAll();
  }


}
