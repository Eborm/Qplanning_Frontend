import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DropDown, PersonalBooking, User} from '../../_models';
import {Moment} from 'moment';
import {AuthenticationService, RepositoryService} from '../../_services';
import * as moment from 'moment';

@Component({
  selector: 'app-klant-planning',
  templateUrl: './klant-planning.component.html',
  styleUrls: ['./klant-planning.component.css']
})
export class KlantPlanningComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  nonBillableHoursOutput: PersonalBooking[];
  public displayedColumns = ['Weeknumber', 'Year', 'Subject', 'Hours'];
  public dataSource = new MatTableDataSource<PersonalBooking>();
  currentUser: User;
  startDate: Moment;
  endDate: Moment;
  teamDropDown: DropDown[];
  klantDropDown: DropDown[];
  initialLoad: boolean;
  selectedTeamId: number;
  selectedKlantIds: number[];
  isLoading = false;
  hasError = false;
  areAllCollapsed = true;
  orderKlantenAsc = true;
  orderTotaalAsc = true;
  isKlantOrderClicked = false;
  isTotaalOrderClicked = false;

  personalPlanningViewModel;


  constructor( private repoService: RepositoryService,
               private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.startDate = moment().startOf('week').add(-1, 'month');
    this.endDate = moment(this.startDate, 'YYYY-DD-MM').add(3, 'month').startOf('week').utc(true);
  }

  ngOnInit() {
    this.initialLoad = true;
    this.getAllDropDownValues();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllDropDownValues = () => {
    this.repoService.getData('api/team/getDropDownValues')
      .subscribe(res => {
        // @ts-ignore
        const {teamDropDown, klantDropDown, initialSelectedTeamId} = res;
        this.teamDropDown = teamDropDown;
        this.klantDropDown = klantDropDown;
        if (this.initialLoad) {
          this.selectedTeamId = initialSelectedTeamId;
          this.initialLoad = false;
          this.getMyCurrentPlanning();
        }
      });
  }

  public getMyCurrentPlanning = () => {
    if (!this.isLoading) {
      this.isLoading = true;
      this.hasError = false;
      if (!this.selectedTeamId) { this.selectedTeamId = 0; }
      this.repoService.post('api/boeking/getKlantBoekingWithinPeriod',
        {endDate: this.endDate, startDate: this.startDate, teamId: this.selectedTeamId, klantIds: this.selectedKlantIds})
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

      this.personalPlanningViewModel.topRows.forEach(klant => {
         klant.expanded = true;
      });
      this.areAllCollapsed = false;
      return;
    }
    if (this.areAllCollapsed === false) {
      this.personalPlanningViewModel.topRows.forEach(klant => {
        klant.expanded = false;
      });
      this.areAllCollapsed = true;
      return;
    }
  }

  public orderKlanten() {
    if (this.orderKlantenAsc) {
      this.personalPlanningViewModel.topRows.sort((a, b) => b.naam.localeCompare(a.naam));
    } else {
      this.personalPlanningViewModel.topRows.sort((a, b) => a.naam.localeCompare(b.naam));
    }
    this.orderKlantenAsc = !this.orderKlantenAsc;
    this.isKlantOrderClicked = true;
    this.isTotaalOrderClicked = false;
  }

  public orderTotaal() {
    if (this.orderTotaalAsc) {
      this.personalPlanningViewModel.topRows.sort((a, b) => b.total.localeCompare(a.total, undefined, {numeric: true}));
    } else {
      this.personalPlanningViewModel.topRows.sort((a, b) => a.total.localeCompare(b.total, undefined, {numeric: true}));
    }
    this.orderTotaalAsc = !this.orderTotaalAsc;
    this.isKlantOrderClicked = false;
    this.isTotaalOrderClicked = true;
  }

}
