import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass,
    IconComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() name!: String;
  @Input() size: 'large' | 'medium' | 'small' = 'large';
  @Input() type: 'flat' | 'outline' = 'flat';
  @Input() valid: boolean = true;
  @Input() icon!: string;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  clickButton(){
    if(this.valid){
      this.clickEvent.emit();
    }
  }


}
