import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/molecule/header/header.component';
import { HeaderService } from './core/services/header/header.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './shared/components/atom/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgxSpinnerModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'challenge-santovecino-hotel';

  constructor(
    private headerService: HeaderService,
  ){}

  getVisibleHeader(): boolean{
    return this.headerService.visibleHeader;
  }
}
