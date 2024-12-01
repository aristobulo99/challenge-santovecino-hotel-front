import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Room } from '../../interfaces/room.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }

  async getRooms(): Promise<Room[]>{
    return lastValueFrom(
      this.http.get<Room[]>(`${environment.apiRoom}`)
    );
  }

  getRoomsObs(): Observable<Room[]>{
    return this.http.get<Room[]>(`${environment.apiRoom}`)
  }

  async getRoomById(roomId: string): Promise<Room[]>{
    return lastValueFrom(
      this.http.get<Room[]>(`${environment.apiRoom}?id=${roomId}`)
    )
  }
}
