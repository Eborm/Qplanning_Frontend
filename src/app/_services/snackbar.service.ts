import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor( private snackBar: MatSnackBar) { }

  public showSnackBar = (message: string, showTimeInSeconds: number) => {
      this.snackBar.open(message, 'Sluiten', {duration: showTimeInSeconds, verticalPosition: 'top'});
  }
}
