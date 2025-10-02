import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gebruiker-resetpassword',
  templateUrl: './gebruiker-resetpassword.component.html',
  styleUrls: ['./gebruiker-resetpassword.component.css']
})
export class GebruikerResetpasswordComponent implements OnInit {
  form: FormGroup;
  newPassword: string;
  email: string;
  title: string;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<GebruikerResetpasswordComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.newPassword = data.newPassword;
    this.email = data.email;
    this.title = data.title;
  }

  ngOnInit() {
    this.form = this.fb.group({
       email: [this.email, []],
       newPassword: [this.newPassword, [Validators.required,
         Validators.minLength(8),
         Validators.pattern(/\d/),
         Validators.pattern(/[A-Z]/),
         Validators.pattern(/[a-z]/)]]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
