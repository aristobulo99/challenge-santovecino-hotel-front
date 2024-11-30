import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReservation, Reservation } from '../../interfaces/reservation.interfaces';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient
  ) { }

  generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dateList: Date[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= new Date(endDate)) {
      dateList.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateList;
  }

  postReservation(reservation: CreateReservation){
    return lastValueFrom(
      this.http.post(`${environment.apiReservation}`, reservation)
    )
  }

  async getReservation(): Promise<Reservation[]>{
    return lastValueFrom(
      this.http.get<Reservation[]>(`${environment.apiReservation}`)
    )
  }

  async getReservedDates(){
    const listDate: Date[] = [];

    const reservation: Reservation[] =  await this.getReservation();
    reservation.forEach(res =>  {
      let dates = this.generateDateRange(res.startDate, res.endDate);
      listDate.push(...dates);
    })

    return listDate;
  }
}
