import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './simple-card.component.html',
  styleUrl: './simple-card.component.scss'
})
export class SimpleCardComponent {

  @Input() type: 'simple' | 'turquoise' = 'simple';
  @Input() content!: TemplateRef<any>;
  @Input() paddingSize: 'large' | 'small' = 'small'

}
