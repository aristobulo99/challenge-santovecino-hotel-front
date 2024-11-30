import { Component, EventEmitter, Output } from '@angular/core';
import { SimpleCardComponent } from '../../atom/simple-card/simple-card.component';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-search-form',
  standalone: true,
  imports: [
    SimpleCardComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './reservation-search-form.component.html',
  styleUrl: './reservation-search-form.component.scss'
})
export class ReservationSearchFormComponent {

  @Output() searchDocumentEvent: EventEmitter<number> = new EventEmitter();

  public minLengthNumber: number = 6;
  public maxLengthNumber: number = 12;
  public inputDocument: FormControl = new FormControl<number | null>(null, [Validators.required, Validators.minLength(this.minLengthNumber), Validators.maxLength(this.maxLengthNumber)])

  searchDocument(){
    if(this.inputDocument.valid){
      this.searchDocumentEvent.emit(
        this.inputDocument.value as number
      )
    }
  }

}
