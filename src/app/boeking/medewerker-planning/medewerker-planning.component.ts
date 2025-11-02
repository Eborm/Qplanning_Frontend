import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {AuthenticationService, RepositoryService} from '../../_services';
import * as moment from 'moment';
import {DropDown, User} from '../../_models';

@Component({
  selector: 'app-medewerker-planning',
  templateUrl: './medewerker-planning.component.html',
  styleUrls: ['./medewerker-planning.component.css']
})
export class MedewerkerPlanningComponent implements OnInit {
  public displayedColumns = ['Weeknumber', 'Year', 'Subject', 'Hours'];
  currentUser: User;
  startDate: Moment;
  endDate: Moment;
  teamDropDown: DropDown[];
  medewerkerDropDown: DropDown[];
  initialLoad: boolean;
  selectedTeamId: number;
  selectedMedewerkerIds: number[];
  isLoading = false;
  hasError = false;
  areAllCollapsed = true;
  personalPlanningViewModel;
  nameOrderAsc = true;
  orderFunctieAsc = true;
  orderTotaalAsc = true;
  isNaamOrderClicked = true;
  isFunctieOrderClicked = false;
  isTotaalOrderClicked = false;

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

  public getAllDropDownValues = () => {
    this.repoService.getData('api/team/getDropDownValues')
      .subscribe(res => {
        // @ts-ignore
        const {teamDropDown, medewerkerDropDown, initialSelectedTeamId} = res;
        this.teamDropDown = teamDropDown;
        this.medewerkerDropDown = medewerkerDropDown;
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
      this.repoService.post('api/boeking/getMedewerkerBoekingWithinPeriod',
        {endDate: this.endDate, startDate: this.startDate, teamId: this.selectedTeamId, medewerkerIds: this.selectedMedewerkerIds})
        .subscribe(res => {
          // @ts-ignore
          this.personalPlanningViewModel = res.personalPlanningViewModel as personalPlanningViewModel;
          this.isLoading = false;
        },
          error => this.hasError = true);
    }
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

  public orderMedewerker() {
    if (this.nameOrderAsc) {
      this.personalPlanningViewModel.topRows.sort((a, b) => b.naam.localeCompare(a.naam));
    } else {
      this.personalPlanningViewModel.topRows.sort((a, b) => a.naam.localeCompare(b.naam));
    }
    this.nameOrderAsc = !this.nameOrderAsc;
    this.isNaamOrderClicked = true;
    this.isFunctieOrderClicked = false;
    this.isTotaalOrderClicked = false;
  }

  public orderFunctie() {
    if (this.orderFunctieAsc) {
      this.personalPlanningViewModel.topRows.sort((a, b) => b.functie.localeCompare(a.functie));
    } else {
      this.personalPlanningViewModel.topRows.sort((a, b) => a.functie.localeCompare(b.functie));
    }
    this.orderFunctieAsc = !this.orderFunctieAsc;
    this.isNaamOrderClicked = false;
    this.isFunctieOrderClicked = true;
    this.isTotaalOrderClicked = false;
  }

  public orderTotaal() {
    if (this.orderTotaalAsc) {
      this.personalPlanningViewModel.topRows.sort((a, b) => b.total.localeCompare(a.total, undefined, {numeric: true}));
    } else {
      this.personalPlanningViewModel.topRows.sort((a, b) => a.total.localeCompare(b.total, undefined, {numeric: true}));
    }
    this.orderTotaalAsc = !this.orderTotaalAsc;
    this.isNaamOrderClicked = false;
    this.isFunctieOrderClicked = false;
    this.isTotaalOrderClicked = true;
  }

}
