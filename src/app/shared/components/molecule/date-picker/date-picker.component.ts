import { JsonPipe, NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatNativeDateModule,
    MatDatepickerModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit {

  @Input() label!: string;
  @Input() control!: FormGroup;

  public minDate!: Date;
  public maxDate!: Date;
  private isUpdatingErrors = false;

  ngOnInit(): void {
    this.control.setValidators(Validators.compose([this.control.validator,this.validateDateRange()]));
    const currentDate = new Date();

    this.minDate = new Date(currentDate); 
    this.maxDate = new Date(currentDate);

    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.statusChanges();
    
  }

  statusChanges(){
    this.control.statusChanges.subscribe(() => {
      if (this.isUpdatingErrors) {
        return;
      }
  
      const invalidRangeError = this.control.hasError('invalidRange');
      const startControl = this.control.get('start');
      const endControl = this.control.get('end');
  
      if (startControl && endControl) {
        this.isUpdatingErrors = true;
        if (invalidRangeError) {
          startControl.setErrors({ invalidRange: true });
          endControl.setErrors({ invalidRange: true });
        }else{
          startControl.setErrors(null);
          endControl.setErrors(null);

        }
        this.isUpdatingErrors = false;
      }
    });
  }

  validateDateRange(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get('start')?.value;
      const end = group.get('end')?.value;
      if (start && end) {
        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);

        const timeDiff = (endDate.getTime() + 1) - startDate.getTime();
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
  
        if (dayDiff > 3) {
          return { invalidRange: true };
        }
      }

      return null;
    };
  }

  getInvalidRange(): boolean {
    return this.control.hasError('invalidRange');
  }


}
