import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actions, DataSource } from '../../../../core/interfaces/table.interfaces';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { DateFormatPipe } from '../../../pipe/date-format/date-format.pipe';
import { ButtonComponent } from '../../atom/button/button.component';
import { SimpleCardComponent } from '../../atom/simple-card/simple-card.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    ButtonComponent,
    DateFormatPipe,
    SimpleCardComponent,
    NgClass
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() data: DataSource[] = [];
  @Input() displayedColumns: string[] = [];

  @Output() actionsEvent: EventEmitter<{action: string, data: DataSource}> = new EventEmitter();

  typeOfDate(value: string | number | Date | boolean | Actions[]): boolean {
    return value instanceof Date;
  }

  actionSelectio(action: string, data: DataSource){
    this.actionsEvent.emit({action, data});
  }

}
