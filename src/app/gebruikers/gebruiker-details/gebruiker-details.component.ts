import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalMode} from '../../_enums/modalMode';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-gebruiker-add',
  templateUrl: './gebruiker-details.component.html',
  styleUrls: ['./gebruiker-details.component.css']
})
export class GebruikerDetailsComponent implements OnInit {
  form: FormGroup;
  id: number;
  voornaam: string;
  achternaam: string;
  password: string;
  email: string;
  userName: string;
  title: string;
  modalMode: ModalMode;
  saveTitle: string;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<GebruikerDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.saveTitle = data.saveTitle;
    this.modalMode = data.modalMode;
    this.id = data.id;
    this.voornaam = data.voornaam;
    this.achternaam = data.achternaam;
    this.email = data.email;
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [this.email, []],
      password: [this.password, [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/\d/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[a-z]/)]],
      voornaam: [this.voornaam, []],
      achternaam: [this.achternaam, []],
      userName: [this.userName, []],
      id: [this.id, []]
    });
  }

  save() {
    this.userName = this.form.value.email;
    this.form.patchValue({userName: this.userName});
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
