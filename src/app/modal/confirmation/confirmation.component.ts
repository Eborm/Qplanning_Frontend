import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  title: string;
  removeMessage: string;

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.removeMessage = data.removeMessage;
  }

  ngOnInit() {
  }

  delete(remove: string) {
    this.dialogRef.close(remove);
  }

  close() {
    this.dialogRef.close();
  }

}
