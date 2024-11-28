import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.scss'
})
export class ButtonToggleComponent {

  @Input() title!: string;
  @Input() selectd: boolean = false;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter();


  clickButton(){
    this.clickEvent.emit();
  }

}
