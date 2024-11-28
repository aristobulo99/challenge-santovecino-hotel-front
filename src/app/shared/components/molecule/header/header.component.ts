import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../atom/icon/icon.component';
import { ButtonToggleComponent } from '../../atom/button-toggle/button-toggle.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderService } from '../../../../core/services/header/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IconComponent, 
    ButtonToggleComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {}

  getbuttonsToggle(): ButtonToggle[] {
    return this.headerService.buttonsToggle;
  }

  clickButton(url: string){
    this.router.navigate([url]);
  }

}

export interface ButtonToggle{
  title: string;
  selectd: boolean;
  url: string;
}
