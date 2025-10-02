import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PersonalBooking} from '../../_models';

@Component({
  selector: 'app-non-billable-list',
  templateUrl: './non-billable-list.component.html',
  styleUrls: ['./non-billable-list.component.css']
})
export class NonBillableListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @Input() nonBillableHours: PersonalBooking[];
  public displayedColumns = ['Weeknumber', 'Year', 'Subject', 'Hours'];
  public dataSource = new MatTableDataSource<PersonalBooking>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.nonBillableHours;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (typeof changes.nonBillableHours !== 'undefined') {
      // retrieve the quiz variable change info
      const change = changes.nonBillableHours;
      if (!change.isFirstChange()) {
        this.reloadTableData();
      }
    }
  }

  reloadTableData() {
    this.dataSource.data = this.nonBillableHours;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
