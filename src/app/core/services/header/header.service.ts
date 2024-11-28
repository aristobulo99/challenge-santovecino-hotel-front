import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _visibleHeader: boolean = false;

  constructor() { }

  get visibleHeader(){
    return this._visibleHeader;
  }

  set visibleHeader(value: boolean){
    this._visibleHeader = value;
  }
}
