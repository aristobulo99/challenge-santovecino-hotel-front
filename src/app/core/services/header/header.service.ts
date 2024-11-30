import { Injectable } from '@angular/core';
import { ButtonToggle } from '../../../shared/components/molecule/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _visibleHeader: boolean = false;
  private _buttonsToggle: ButtonToggle[] = [
    {
      title: 'Disponibilidad',
      selectd: false,
      url: '/availability'
    },
    {
      title: 'Mis Reservas',
      selectd: false,
      url: '/my-reservations'
    }    
  ]

  constructor() { }

  get visibleHeader(){
    return this._visibleHeader;
  }

  set visibleHeader(value: boolean){
    this._visibleHeader = value;
  }

  get buttonsToggle(){
    return this._buttonsToggle;
  }

  set buttonsToggle(value: ButtonToggle[]){
    this._buttonsToggle = value;
  }
}
