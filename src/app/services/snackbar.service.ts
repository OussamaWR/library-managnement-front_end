import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar : MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    if (action === 'error') {
      this.snackbar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['black-snackbar'], //this class exist in thr  file style.css  of the project
      });
    } else {
      this.snackbar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['green-snackbar'], //this class exist in thr  file style.css  of the project
      });
    }
  }
}
