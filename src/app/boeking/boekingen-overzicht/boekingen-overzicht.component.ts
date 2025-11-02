import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import moment from 'moment';
import {Moment} from 'moment';
import {FileService, RepositoryService, SnackbarService} from '../../_services';
import {BaseResponse, BookingDetailsView, DropDown} from '../../_models';
import {BoekingDetailsComponent} from '../boeking-details/boeking-details.component';
import {ConfirmationComponent} from '../../modal';
import {FormControl} from '@angular/forms';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-boekingen-overzicht',
  templateUrl: './boekingen-overzicht.component.html',
  styleUrls: ['./boekingen-overzicht.component.css']
})
export class BoekingenOverzichtComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['Date', 'Weeknumber', 'Hours'
    , 'BookedFor', 'Assignment',  'Employee',
    'Function', 'Team', 'update', 'delete'];
  public dataSource = new MatTableDataSource<BookingDetailsView>();
  filterValues = {
    geboektOp: '',
    medewerkerNaam: '',
    medewerkerFunctie: '',
    teamNaam: ''
  };
  startDate: Moment;
  endDate: Moment;
  klantenDropDown: DropDown[];
  medewerkersDropDown: DropDown[];
  indirecteUrenDropDown: DropDown[];
  opdrachtenDropDown: DropDown[];
  teamDropDown: DropDown[];
  geboektOpFilter = new FormControl('');
  medewerkerFilter = new FormControl('');
  functieFilter = new FormControl('');
  teamFilter = new FormControl('');
  initialLoad: boolean;
  selectedTeamId: number;

  constructor(private repoService: RepositoryService, private dialog: MatDialog, private snackBarService: SnackbarService
            , private fileService: FileService) {
    this.startDate = moment().startOf('week');
    this.endDate = moment(this.startDate, 'YYYY-DD-MM').add(3, 'month').startOf('week').utc(true);
  }

  ngOnInit() {
      this.initialLoad = true;
      this.geboektOpFilter.valueChanges
        .subscribe(
          geboektOp => {
            this.filterValues.geboektOp = geboektOp;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        );
      this.medewerkerFilter.valueChanges
        .subscribe(
          medewerkerNaam => {
            this.filterValues.medewerkerNaam = medewerkerNaam;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        );
      this.functieFilter.valueChanges
        .subscribe(
          medewerkerFunctie => {
            this.filterValues.medewerkerFunctie = medewerkerFunctie;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        );
      this.teamFilter.valueChanges
      .subscribe(
        teamNaam => {
          this.filterValues.teamNaam = teamNaam;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );

      this.getAllDropDownValues();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllBookingRecords = () => {
    if (!this.selectedTeamId) { this.selectedTeamId = 0; }
    this.repoService.post('api/boeking/getDetailBoekingWithinPeriod',
      {endDate: this.endDate, startDate: this.startDate, teamId: this.selectedTeamId})
      .subscribe(res => {
        // @ts-ignore
        this.dataSource.data = res.bookingsDetail as BookingDetailsView[];
        this.dataSource.filterPredicate = this.tableFilter();
      });
  }

  public getAllDropDownValues = () => {
    this.repoService.getData('api/boeking/getDropDownValues')
      .subscribe(res => {
        // @ts-ignore
        const {klantDropDown, medewerkerDropDown, indirecteUrenDropDown, opdrachtDropDown, teamDropDown, initialSelectedTeam} = res;
        this.klantenDropDown = klantDropDown;
        this.medewerkersDropDown = medewerkerDropDown;
        this.opdrachtenDropDown = opdrachtDropDown;
        this.indirecteUrenDropDown = indirecteUrenDropDown;
        this.teamDropDown = teamDropDown;
        if (this.initialLoad) {
          this.selectedTeamId = initialSelectedTeam;
          this.initialLoad = false;
          this.getAllBookingRecords();
        }
      });
  }

  public getExcelExport = () => {
    // tslint:disable-next-line:max-line-length
    this.fileService.downloadExcelFile(`api/boeking/getBoekingExcelExport?startDate=${this.startDate.format('YYYY-MM-DD')}&endDate=${this.endDate.format('YYYY-MM-DD')}&teamId=${this.selectedTeamId}`)
      .subscribe(response => {
        const blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
        fileSaver.saveAs(blob, 'BoekingenExport.xlsx');
        });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getTotalHours() {
    if (this.dataSource.data) {
      return this.dataSource.filteredData.map(t => t.uren).reduce((acc, value) => acc + value, 0);
    }
    return 0;
  }

  public addBoeking = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Boeking toevoegen',
      saveButtonText: 'Toevoegen Boeking',
      klantenDropDown: this.klantenDropDown,
      medewerkersDropDown: this.medewerkersDropDown,
      indirecteUrenDropDown: this.indirecteUrenDropDown,
      opdrachtenDropDown: this.opdrachtenDropDown
    };
    const dialogRef = this.dialog.open(BoekingDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
        this.repoService.post('api/boeking/add', data)
          .subscribe(res => {
            const result = res as BaseResponse;
            this.snackBarService.showSnackBar(result.message, 3000);
            if (result.success === true) {
              this.getAllBookingRecords();
            }
          });
      }}
    );
  }

  public redirectToUpdate = (element) => {
      const boekingElement = element as BookingDetailsView;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '600px';
      dialogConfig.data = {
        title: 'Boeking bijwerken',
        saveButtonText: 'Bijwerken Boeking',
        klantenDropDown: this.klantenDropDown,
        medewerkersDropDown: this.medewerkersDropDown,
        indirecteUrenDropDown: this.indirecteUrenDropDown,
        opdrachtenDropDown: this.opdrachtenDropDown,
        medewerkerId: boekingElement.medewerkerId,
        klantId: boekingElement.klantId,
        opdrachtId: boekingElement.opdrachttId,
        indirecteUrenId: boekingElement.indirecteUrenId,
        uren: boekingElement.uren,
        weeknumber: boekingElement.weeknummer,
        plannedDate: boekingElement.plannedDate
      };
      const dialogRef = this.dialog.open(BoekingDetailsComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          data.id = boekingElement.id;
          this.repoService.update('api/boeking/update', data)
            .subscribe(res => {
              const result = res as BaseResponse;
              this.snackBarService.showSnackBar(result.message, 3000);
              if (result.success === true) {
                this.getAllBookingRecords();
              }
            });
        }}
    );
  }

  public redirectToDelete = (id: string) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Bevestig verwijderen',
      removeMessage: 'Weet u zeker dat u wilt verwijderen?'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'delete') {
        this.repoService.post('api/boeking/delete', {id})
          .subscribe(res => {
            const result = res as BaseResponse;
            this.snackBarService.showSnackBar(result.message, 3000);
            if (result.success === true) {
              this.getAllBookingRecords();
            }
          });
        }}
    );
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

}
