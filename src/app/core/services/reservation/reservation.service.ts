import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReservation, Reservation, RoomReservation } from '../../interfaces/reservation.interfaces';
import { lastValueFrom, Observable, retry } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Room } from '../../interfaces/room.interfaces';

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

  async postReservation(reservation: CreateReservation){
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

  async getReservationByUserId(userId: string): Promise<Reservation[]>{
    return await lastValueFrom(
      this.http.get<Reservation[]>(`${environment.apiReservation}?userId=${userId}`)
    )
  }

  getReservationByUserIdTemp(userId: string): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${environment.apiReservation}?userId=${userId}`)
  }

  mapMyReservation(reservation: Reservation[], room: Room[]): RoomReservation[]{
    return reservation.map<RoomReservation>(
      reserv => (
        {
          id: reserv.id,
          startDate: reserv.startDate,
          endDate: reserv.endDate,
          state: reserv.state,
          room: room.filter(r => r.id === reserv.roomId)[0]
        }
      )
    )
  }


}
