import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PersonalBooking, User} from '../../_models';
import {AuthenticationService, RepositoryService} from '../../_services';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-planning-list',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.css']
})
export class PlanningListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  nonBillableHoursOutput: PersonalBooking[];
  public displayedColumns = ['Weeknumber', 'Year', 'Subject', 'Hours'];
  public dataSource = new MatTableDataSource<PersonalBooking>();
  currentUser: User;
  startDate: Moment;
  endDate: Moment;
  isLoading = false;
  hasError = false;
  areAllCollapsed = true;

  personalPlanningViewModel;


  constructor( private repoService: RepositoryService,
               private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.startDate = moment().startOf('week');
    this.endDate = moment(this.startDate, 'YYYY-DD-MM').add(3, 'month').startOf('week').utc(true);
  }

  ngOnInit() {
    this.getMyCurrentPlanning();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  public getMyCurrentPlanning = () => {
    if (!this.isLoading) {
      this.isLoading = true;
      this.hasError = false;
      this.repoService.post('api/boeking/getPersonalBoekingWithinPeriod',
        {endDate: this.endDate, startDate: this.startDate})
        .subscribe(res => {
          // @ts-ignore
          this.personalPlanningViewModel = res.personalPlanningViewModel as personalPlanningViewModel;
          this.isLoading = false;
        },
          error => this.hasError = true);
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public collapseAll() {
    if (this.areAllCollapsed === true) {

      this.personalPlanningViewModel.topRows.forEach(personalPlanning => {
        personalPlanning.expanded = true;
      });
      this.areAllCollapsed = false;
      return;
    }
    if (this.areAllCollapsed === false) {
      this.personalPlanningViewModel.topRows.forEach(personalPlanning => {
        personalPlanning.expanded = false;
      });
      this.areAllCollapsed = true;
      return;
    }
  }

}
