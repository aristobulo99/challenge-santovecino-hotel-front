import { Component } from '@angular/core';
import { ReservationSearchFormComponent } from '../../shared/components/organism/reservation-search-form/reservation-search-form.component';
import { NgTemplateOutlet } from '@angular/common';
import { MyReservation } from '../../core/interfaces/reservation.interfaces';
import { getUsers } from '../../core/mocks/user.mock';
import { getRoomReservation } from '../../core/mocks/reservation.mock';
import { LoadingService } from '../../core/services/loading/loading.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [
    ReservationSearchFormComponent,
    NgTemplateOutlet
  ],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})
export class MyReservationsComponent {

  public existingGuest: boolean = false;
  public reservation!: MyReservation;

  constructor(
    private loadingService: LoadingService
  ){}

  searchDocument(document: number){
    console.log(`Documento -> ${document}`);
    this.loadingService.spinnerShow();
    setTimeout(
      () => {
        this.reservation = {
          user: getUsers()[0],
          roomReservation: getRoomReservation(5)
        }
        this.existingGuest = true;
        this.loadingService.spinnerHide();
      }, 1500
    )
  }

}
