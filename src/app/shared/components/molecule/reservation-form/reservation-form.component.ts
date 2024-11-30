import { Component, Input, OnInit } from '@angular/core';
import { SimpleCardComponent } from '../../atom/simple-card/simple-card.component';
import { SelectComponent, SelectionOption } from '../../atom/select/select.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { Room } from '../../../../core/interfaces/room.interfaces';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    SimpleCardComponent,
    SelectComponent,
    DatePickerComponent,
    InputComponent,
    ButtonComponent,
    FormControlPipe
  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss'
})
export class ReservationFormComponent implements OnInit {

  @Input() dataRoom: Room[] = [];

  public minLengthNumber: number = 6;
  public minLengthString: number = 2;
  public maxLengthNumber: number = 12;
  public maxLengthString: number = 50;
  public formReservation: FormGroup = new FormGroup({});
  public controlDate: FormGroup = new FormGroup(
    {
      start: new FormControl<Date | null>(null, [Validators.required]),
      end: new FormControl<Date | null>(null, [Validators.required]),
    },
  );
  public formGroupSection: FormGroupSection[] = [
    {
      title: 'HABITACIÓN',
      input: [
        {
          inputType: 'select',
          type: 'text',
          label: 'Habitación',
          nameControl: 'roomId',
          options: [],
        },
        {
          inputType: 'date-picker',
          type: 'text',
          label: 'Fechas de reservacion',
          nameControl: '',
          options: [],
        }
      ]
    },
    {
      title: 'HUÉSPED',
      input: [
        {
          inputType: 'input',
          type: 'number',
          label: 'Documento',
          placeholder: 'Escriba el numero de documento',
          nameControl: 'document',
          options: [],
          min: this.minLengthNumber,
          max: this.maxLengthNumber
        },
        {
          inputType: 'input',
          type: 'text',
          label: 'Nombre',
          placeholder: 'Escriba el nombre',
          nameControl: 'name',
          options: [],
          min: this.minLengthString,
          max: this.maxLengthString
        },
        {
          inputType: 'input',
          type: 'text',
          label: 'Apellido',
          placeholder: 'Escriba el Apellido',
          nameControl: 'lastName',
          options: [],
          min: this.minLengthString,
          max: this.maxLengthString
        },
        {
          inputType: 'input',
          type: 'email',
          label: 'Correo electronico',
          placeholder: 'Escriba el Correo electronico',
          nameControl: 'email',
          options: [],
        },
        {
          inputType: 'input',
          type: 'number',
          label: 'Teléfono',
          placeholder: 'Escriba el Teléfono',
          nameControl: 'phone',
          options: [],
          min: this.minLengthNumber,
          max: this.maxLengthNumber
        }
        
      ]
    },
  ];

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.formGroupSection[0].input[0].options = this.dataRoom.map<SelectionOption>(dr => ({valueId: dr.id, option: `${dr.name} - Capacidad para ${dr.ability} ${dr.ability > 1 ? 'huéspedes': 'huésped'}`}))
    this.initFormReservation();
    console.log()
  }

  initFormReservation(){
    this.formReservation = this.fb.group(
      {
        roomId: new FormControl<number | null>(null, [Validators.required]),
        document: new FormControl<number | null>(null, [Validators.required, Validators.minLength(this.minLengthNumber), Validators.maxLength(this.maxLengthNumber)]),
        name: new FormControl<string>('', [Validators.required, Validators.minLength(this.minLengthString), Validators.maxLength(this.maxLengthString)]),
        lastName: new FormControl<string>('', [Validators.required, Validators.minLength(this.minLengthString), Validators.maxLength(this.maxLengthString)]),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        phone: new FormControl<number | null>(null, [Validators.required, Validators.minLength(this.minLengthNumber), Validators.maxLength(this.maxLengthNumber)])
      }
    );
  }

  formValid(): boolean{
    return this.formReservation.valid && this.controlDate.valid;
  }

}

interface FormGroupSection{
  title: string;
  input: InputControl[]
}

interface InputControl{
  inputType: 'input' | 'select' | 'date-picker' | 'button';
  type: 'text'| 'number' | 'email';
  label: string;
  placeholder?: string;
  nameControl: string;
  options: SelectionOption[];
  min?: number;
  max?: number;
}
