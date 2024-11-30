import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser, User } from '../../interfaces/users.interfaces';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  async postUser(userData: CreateUser){
    return lastValueFrom(
      this.http.post<User>(`${environment.apiUser}`, userData)
    )
  }

  async getUserByDocument(document: number): Promise<User[]>{
    return lastValueFrom(
      this.http.get<User[]>(`${environment.apiUser}?document=${document}`)
    )
  }
}
