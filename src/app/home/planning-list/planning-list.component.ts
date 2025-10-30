import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PersonalBooking, User} from '../../_models';
import {AuthenticationService, RepositoryService} from '../../_services';
import {Moment} from 'moment';
import * as moment from 'moment';
import {BaseResponse, BookingDetailsView, DropDown} from '../../_models';
import {BoekingDetailsComponent} from '../../boeking/boeking-details/boeking-details.component';
import {ConfirmationComponent} from '../../modal';
import {FormControl} from '@angular/forms';
import * as fileSaver from 'file-saver';


interface DagPlanning {
  date: string;
  uren: number;
  boekingen: number;
}

interface KlantDagPlanning {
  naam: string;
  dagen: DagPlanning[];
}

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
  public dataSource = new MatTableDataSource<BookingDetailsView>();
  currentUser: User;
  startDate: Moment;
  endDate: Moment;
  isLoading = false;
  hasError = false;
  areAllCollapsed = true;
  klantenDagPlanning: KlantDagPlanning[] = [];
  personalPlanningViewModel;
  filterValues = {
    geboektOp: '',
    medewerkerNaam: '',
    medewerkerFunctie: '',
    teamNaam: ''
  };
  selectedTeamId: number;


  constructor( private repoService: RepositoryService,
               private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.startDate = moment().startOf('week');
    this.endDate = moment(this.startDate, 'YYYY-DD-MM').add(3, 'month').startOf('week').utc(true);
    this.filterValues.medewerkerNaam = this.currentUser.voornaam + '  ' + this.currentUser.achternaam;
  }

  ngOnInit() {
    this.getAllBookingRecords();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

public getAllBookingRecords = () => {
  if (!this.selectedTeamId) { this.selectedTeamId = 0; }

  this.isLoading = true;
  this.hasError = false;

  this.repoService.post('api/boeking/getDetailBoekingWithinPeriod',
    {endDate: this.endDate, startDate: this.startDate, teamId: this.selectedTeamId})
    .subscribe(res => {
      let bookings = (res as any).bookingsDetail || [];
      bookings = bookings.filter(b =>
        b.medewerkerNaam.toLowerCase().includes(this.filterValues.medewerkerNaam.toLowerCase())
      );
      this.dataSource.data = bookings;
      this.dataSource.filterPredicate = this.tableFilter();
      this.buildDailyPlanning(bookings);
      this.isLoading = false;
    }, error => {
      this.hasError = true;
      this.isLoading = false;
    });
}

  tableFilter(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);

      // tslint:disable-next-line:max-line-length
      if (searchTerms.geboektOp === '' && searchTerms.medewerkerNaam === '' && searchTerms.medewerkerFunctie === '' && searchTerms.teamNaam === '') {
        return true;
      }

      return data.geboektOp.toLocaleLowerCase().indexOf(searchTerms.geboektOp.toLocaleLowerCase()) !== -1
        && data.medewerkerNaam.toLocaleLowerCase().indexOf(searchTerms.medewerkerNaam.toLocaleLowerCase()) !== -1
        && data.medewerkerFunctie.toLocaleLowerCase().indexOf(searchTerms.medewerkerFunctie.toLocaleLowerCase()) !== -1
        && data.teamNaam.toLocaleLowerCase().indexOf(searchTerms.teamNaam.toLocaleLowerCase()) !== -1;
    };
  }

    buildDailyPlanning(bookings: BookingDetailsView[]) {

    const maandag = moment(this.startDate).startOf('week');

    // Create 7 days labels in ISO format for comparison
    const dagenLabels = [];
    for (let i = 0; i < 7; i++) {
      dagenLabels.push(moment(maandag).add(i, 'days').format("YYYY-MM-DD"));
    }

    // Get unique list of clients
    const uniekeKlanten = [...new Set(bookings.map(b => b.klantNaam))];

    // Build planning grid
    this.klantenDagPlanning = uniekeKlanten.map(klantNaam => ({
      naam: klantNaam,
      dagen: dagenLabels.map(date => {
        const dagBoekingen = bookings.filter(b =>
          b.klantNaam === klantNaam &&
          moment(b.plannedDate).format("YYYY-MM-DD") === date
        );

        return {
          date,
          uren: dagBoekingen.reduce((sum, b) => sum + b.uren, 0),
          boekingen: dagBoekingen.length
        };
      })
    }));
  }


  public SetDateRange = (week: number) => {
    this.startDate = moment().startOf('year').add(week - 1, 'weeks').startOf('week');
    this.endDate = moment().startOf('year').add(week - 1, 'weeks').endOf('week');
    this.getAllBookingRecords();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
