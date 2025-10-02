import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment';
import {DropDown} from '../../_models';
import {RepositoryService} from '../../_services';

@Component({
  selector: 'app-boeking-add',
  templateUrl: './boeking-details.component.html',
  styleUrls: ['./boeking-details.component.css']
})
export class BoekingDetailsComponent implements OnInit {
  form: FormGroup;
  title: string;
  saveButtonText: string;
  jaar: number;
  boekjaar: number;
  weeknummer: number;
  uren: number;
  geplandeWeeknummer: number;
  geplandeJaar: number;
  medewerkerId: number;
  klantId: number;
  opdrachtId: number;
  indirecteUrenId: number;
  medewerkerIds: number[];
  klantenDropDown: DropDown[];
  medewerkersDropDown: DropDown[];
  indirecteUrenDropDown: DropDown[];
  opdrachtenDropDown: DropDown[];
  boekjaarDropDown: number[];
  plannedDate;
  klantOrIndirectIsProvided: boolean;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<BoekingDetailsComponent>,
              private repoService: RepositoryService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.saveButtonText = data.saveButtonText;
    this.klantenDropDown = data.klantenDropDown;
    this.medewerkersDropDown = data.medewerkersDropDown;
    this.indirecteUrenDropDown = data.indirecteUrenDropDown;
    this.opdrachtenDropDown = data.opdrachtenDropDown;
    this.klantId = data.klantId;
    this.medewerkerId = data.medewerkerId;
    this.opdrachtId = data.opdrachtId;
    this.indirecteUrenId = data.indirecteUrenId;
    this.uren = data.uren;
    this.boekjaar = data.boekjaar;
    if (data.plannedDate) {
      this.plannedDate = moment(data.plannedDate);
      this.geplandeWeeknummer = moment(data.plannedDate).isoWeek();
      this.geplandeJaar = moment(data.plannedDate).isoWeekYear();
    } else {
      this.plannedDate = moment.utc();
      this.geplandeWeeknummer = moment.utc().isoWeek();
      this.geplandeJaar = moment.utc().isoWeekYear();
    }

    if (this.klantId) {
      this.getBookyears(null);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      jaar: [this.plannedDate.year(), []],
      plannedDate: [this.plannedDate, []],
      boekjaar: [this.boekjaar, []],
      weeknummer: [this.plannedDate.isoWeek(), []],
      uren: [this.uren, []],
      datum: [this.plannedDate, []],
      medewerkerId: [this.medewerkerId, []],
      medewerkerIds: [this.medewerkerIds, []],
      klantId: [this.klantId, []],
      opdrachtId: [this.opdrachtId, []],
      indirecteUrenId: [this.indirecteUrenId, []]
    });

    this.klantOrIndirectIsProvided = !!(this.klantId || this.indirecteUrenId);
  }

  getBookyears(event) {
    let idFromKlant = this.klantId;
    if (event) {
      idFromKlant = event.value;
    }
    if (idFromKlant) {
      this.repoService.getData('api/boeking/getBookyears?KlantId=' + idFromKlant)
        .subscribe(res => {
          // @ts-ignore
          this.boekjaarDropDown = res.boekjaren as number[];
        });
    }

    this.klantOrIndirectIsProvided = !!(idFromKlant || this.form.value.indirecteUrenId);
  }

  setIndirecteUren(event) {
    let idFromIndirectUren = this.indirecteUrenId;
    if (event) {
      idFromIndirectUren = event.value;
    }
    this.klantOrIndirectIsProvided = !!(idFromIndirectUren || this.form.value.klantId);
  }

  save() {
    if (this.form.value.klantId || this.form.value.indirecteUrenId) {
      this.form.value.plannedDate = this.plannedDate;
      this.form.value.weeknummer = this.form.value.plannedDate.isoWeek();
      this.form.value.jaar = this.form.value.plannedDate.year();
      this.dialogRef.close(this.form.value);
    } else {
      this.klantOrIndirectIsProvided = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  plannedDateShouldChange()  {
    this.plannedDate = moment().isoWeekday(1).isoWeekYear(this.geplandeJaar).isoWeek(this.geplandeWeeknummer);
  }
}
