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
    return true;
  }

}
