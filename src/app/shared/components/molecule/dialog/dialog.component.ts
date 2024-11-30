import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../../core/interfaces/dialog.interfaces';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../../atom/button/button.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    NgClass,
    ButtonComponent,
    NgTemplateOutlet
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  public templateRef: TemplateRef<any> | undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogComponent>
  ){
    this.templateRef = data.templete;
  }

  onConfirm(){
    this.dialogRef.close({ action: 'confirm' });
  }

  onCancel(){
    this.dialogRef.close({ action: 'cancel' });
  }

}
