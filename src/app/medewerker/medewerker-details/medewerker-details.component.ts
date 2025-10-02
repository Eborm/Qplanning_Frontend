import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DropDown} from '../../_models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-medewerker-details',
  templateUrl: './medewerker-details.component.html',
  styleUrls: ['./medewerker-details.component.css']
})
export class MedewerkerDetailsComponent implements OnInit {form: FormGroup;
  title: string;
  saveButtonText: string;
  voornaam: string;
  tussenVoegsel: string;
  achternaam: string;
  email: string;
  tarief: number;
  internTarief: number;
  medewerkerFunctieId: number;
  teamId: DropDown[];
  teamDropDown: DropDown[];
  medewerkerFunctieDropDown: DropDown[];
  planbaarDoorTeamIds: [];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<MedewerkerDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.saveButtonText = data.saveButtonText;
    this.teamDropDown = data.teamDropDown;
    this.medewerkerFunctieDropDown = data.medewerkerFunctieDropDown;
    this.voornaam = data.voornaam;
    this.tussenVoegsel = data.tussenVoegsel;
    this.achternaam = data.achternaam;
    this.email = data.email;
    this.tarief = data.tarief;
    this.internTarief = data.internTarief;
    this.medewerkerFunctieId = data.medewerkerFunctieId;
    this.teamId = data.teamId;
    this.planbaarDoorTeamIds = data.planbaarDoorTeamIds;
  }

  ngOnInit() {
    this.form = this.fb.group({
      voornaam: [this.voornaam, []],
      tussenVoegsel: [this.tussenVoegsel, []],
      achternaam: [this.achternaam, []],
      email: [this.email, []],
      tarief: [this.tarief, []],
      internTarief: [this.internTarief, []],
      medewerkerFunctieId: [this.medewerkerFunctieId, []],
      teamId: [this.teamId, []],
      planbaarDoorTeamIds: [this.planbaarDoorTeamIds, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}
