import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DropDown} from '../../_models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RepositoryService} from '../../_services';
import * as moment from 'moment';

@Component({
  selector: 'app-boekjaar-details',
  templateUrl: './boekjaar-details.component.html',
  styleUrls: ['./boekjaar-details.component.css']
})
export class BoekjaarDetailsComponent implements OnInit { form: FormGroup;
  title: string;
  saveButtonText: string;
  boekjaar: number;
  bedrag: number;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<BoekjaarDetailsComponent>,
              private repoService: RepositoryService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.saveButtonText = data.saveButtonText;
  }

  ngOnInit() {
    this.form = this.fb.group({
      boekjaar: [this.boekjaar, []],
      bedrag: [this.bedrag, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
