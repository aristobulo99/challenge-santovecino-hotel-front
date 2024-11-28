import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../atom/icon/icon.component';
import { ButtonToggleComponent } from '../../atom/button-toggle/button-toggle.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
export class HeaderComponent implements OnInit {

  public buttonsToggle: ButtonToggle[] = [
    {
      title: 'Disponibilidad',
      selectd: false,
      url: '/availability'
    },
    {
      title: 'Mis Reservas',
      selectd: false,
      url: '/home'
    }    
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) 
    ).subscribe((event: NavigationEnd) => {
      const currentRoute: string = event.urlAfterRedirects;
      this.buttonsToggle.forEach(bt => bt.selectd = false);
      currentRoute.includes('/availability') 
        ? this.buttonsToggle[0].selectd = true 
        : this.buttonsToggle[1].selectd = true;
    });
  }

  clickButton(url: string){
    this.router.navigate([url]);
  }

}

interface ButtonToggle{
  title: string;
  selectd: boolean;
  url: string;
}
