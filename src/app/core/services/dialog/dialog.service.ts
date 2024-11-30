import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../interfaces/dialog.interfaces';
import { DialogComponent } from '../../../shared/components/molecule/dialog/dialog.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(data: DialogData): Promise<{ action: string }>{
    const dialogRef = this.dialog.open(DialogComponent, {
      width: data.width,
      data
    });

    return firstValueFrom(dialogRef.afterClosed());
  }

  closedAll(){
    this.dialog.closeAll();
  }
}
