import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() name!: String; // Nombre asignado al boton
  @Input() size: 'large' | 'medium' | 'small' = 'large'; // control la altura del boton;
  @Input() type: 'flat' | 'outline' = 'flat'; //Control el color del boton
  @Input() valid: boolean = true; //Control si el boton esta activo

  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  clickButton(){
    if(this.valid){
      this.clickEvent.emit();
    }
  }


}
