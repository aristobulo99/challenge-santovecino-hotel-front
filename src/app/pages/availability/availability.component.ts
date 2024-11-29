import { Component, OnInit } from '@angular/core';
import { SimpleCardComponent } from '../../shared/components/atom/simple-card/simple-card.component';
import { LoadingCardComponent } from '../../shared/components/molecule/loading-card/loading-card.component';
import { LoadingService } from '../../core/services/loading/loading.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [SimpleCardComponent, LoadingCardComponent],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss'
})
export class AvailabilityComponent implements OnInit{

  public loadingCard: boolean = true;

  constructor(
    private loadingService: LoadingService
  ){

  }

  ngOnInit(): void {
   setTimeout(
    () => {
      this.loadingCard = false;
      this.loadingService.spinnerHide();
    }, 2000
   )    
  }
}
