import {Component, Inject, OnInit} from '@angular/core';
import {Role} from '../../_models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-gebruiker-roles',
  templateUrl: './gebruiker-roles.component.html',
  styleUrls: ['./gebruiker-roles.component.css']
})
export class GebruikerRolesComponent implements OnInit {
  form: FormGroup;
  saveButtonText: string;
  title: string;
  roles: Role[];
  role: string;
  email: string;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<GebruikerRolesComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.saveButtonText = data.saveButtonText;
    this.roles = data.roles;
    this.email = data.email;
  }

  ngOnInit() {
    this.form = this.fb.group({
      role: [this.role, []],
      email: [this.email, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}
