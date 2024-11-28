import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';



@Injectable(
  {
    providedIn: 'root'
  }
) export class headerControlGuard implements CanActivate {

  constructor(
    private headerService: HeaderService, 
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.headerService.visibleHeader = state.url !== '/home' ? true : false;
    this.headerService.buttonsToggle.forEach(bt => bt.selectd = false);
    this.headerService.buttonsToggle[0].selectd = state.url === '/availability' ? true : false;
    this.headerService.buttonsToggle[1].selectd = state.url === '/home' ? true : false;
    return true;
  }

}
