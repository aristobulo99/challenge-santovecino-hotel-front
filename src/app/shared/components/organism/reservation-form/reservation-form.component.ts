import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SimpleCardComponent } from '../../atom/simple-card/simple-card.component';
import { SelectComponent, SelectionOption } from '../../atom/select/select.component';
import { DatePickerComponent } from '../../molecule/date-picker/date-picker.component';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { Room } from '../../../../core/interfaces/room.interfaces';
import { CreateUser, User } from '../../../../core/interfaces/users.interfaces';
import { UserService } from '../../../../core/services/user/user.service';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { CreateReservation } from '../../../../core/interfaces/reservation.interfaces';
import { ReservationService } from '../../../../core/services/reservation/reservation.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { getAllRoomRequest } from '../../../../store/actions/room.action';

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
export class ReservationFormComponent implements OnInit, OnChanges {

  @Input() dataRoom: Room[] = [];

  public minLengthNumber: number = 6;
  public minLengthString: number = 2;
  public maxLengthNumber: number = 12;
  public maxLengthString: number = 50;
  public blockedDates: Date[] = [];
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
    private fb: FormBuilder,
    private userService: UserService,
    private loadingService: LoadingService,
    private reservationService: ReservationService,
    private toastService: ToastService,
    private store: Store<AppState>
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataRoom']){
      this.formGroupSection[0].input[0].options = this.dataRoom.map<SelectionOption>(
        dr => ({valueId: dr.id, option: `${dr.name} - Capacidad para ${dr.ability} ${dr.ability > 1 ? 'huéspedes': 'huésped'}`})
      );
    }
  }

  ngOnInit() {
    this.initFormReservation();
    this.statusChangesForm()
  }

  async getBlockedDates() : Promise<void>{
    this.blockedDates = await this.reservationService.getReservedDates(this.formReservation.controls['roomId'].value);
  }

  statusChangesForm(){
    this.formReservation.controls['roomId'].valueChanges.subscribe(
      async (values) => {
        if(values != '' && values != null){
          this.controlDate.reset();
          await this.getBlockedDates();
        }
      }
    )
  }

  initFormReservation(){
    this.formReservation = this.fb.group(
      {
        roomId: new FormControl<string>('', [Validators.required]),
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

  async completeData(){
    this.loadingService.spinnerShow();
    const document: number = this.formReservation.get('document')?.value as number;
    if (!document) {
      this.toastService.showWarning('El documento no es válido');
      return;
    }
    
    try{
      const userData: User[] = await this.userService.getUserByDocument(document);
      if(userData.length == 0){
        this.toastService.showInfo('El usuario no está registrado. Por favor, completa la reservación para continuar.');
        return
      }
      const user: any = userData[0];
      Object.keys(user).forEach(key => {
        if (this.formReservation.get(key)) {
          this.formReservation.get(key)?.setValue(user[key]);
        }
      });

    }catch(e){
      console.error(e);
    }finally{
      this.loadingService.spinnerHide();
    }
  }

  async roomReservation(){
    this.loadingService.spinnerShow();
    const document: number = this.formReservation.get('document')?.value as number;

    try{
      const userData: User[] = await this.userService.getUserByDocument(document);
      if(userData.length === 0){
        userData.push(await this.createUser());
      }

      const startDate = new Date(this.controlDate.get('start')?.value);
      const endDate = new Date(this.controlDate.get('end')?.value);

      startDate.setHours(0,0,0,0);
      endDate.setHours(23, 59, 59, 999);

      const reservation: CreateReservation = {
        startDate: startDate,
        endDate: endDate,
        roomId: this.formReservation.get('roomId')?.value,
        userId: userData[0].id,
        state: true,
      }

      await this.reservationService.postReservation(reservation);
      this.store.dispatch(getAllRoomRequest());
    }catch(e){
      console.error(e);
    }finally{
      this.formReservation.reset();
      this.controlDate.reset();
      this.blockedDates = [];
      this.loadingService.spinnerHide();
    }
  }

  async createUser(){
    const user: CreateUser = {
      document: this.formReservation.get('document')?.value as number,
      name: this.formReservation.get('name')?.value,
      lastName: this.formReservation.get('lastName')?.value,
      email: this.formReservation.get('email')?.value,
      phone: this.formReservation.get('phone')?.value
    }
    return await this.userService.postUser(user);
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
