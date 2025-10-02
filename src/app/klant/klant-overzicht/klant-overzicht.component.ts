import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {BaseResponse, DropDown, KlantDetailsView} from '../../_models';
import {FormControl} from '@angular/forms';
import {RepositoryService, SnackbarService} from '../../_services';
import {KlantDetailsComponent} from '../klant-details/klant-details.component';
import {BoekjaarDetailsComponent} from '../../boekjaar/boekjaar-details/boekjaar-details.component';

@Component({
  selector: 'app-klant-overzicht',
  templateUrl: './klant-overzicht.component.html',
  styleUrls: ['./klant-overzicht.component.css']
})
export class KlantOverzichtComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['Name', 'Partner', 'ResponsibleTeam', 'ResponsibleTeams', 'Startdate', 'Enddate', 'update'];
  public dataSource = new MatTableDataSource<KlantDetailsView>();
  filterValues = {
    klantNaam: ''
  };
  teamDropDown: DropDown[];
  medewerkersDropDown: DropDown[];
  opdrachtenDropDown: DropDown[];
  klantFilter = new FormControl('');

  constructor(private repoService: RepositoryService, private dialog: MatDialog, private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.klantFilter.valueChanges
      .subscribe(
        klantNaam => {
          this.filterValues.klantNaam = klantNaam;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.getAllKlantRecords();
    this.getAllDropDownValues();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllKlantRecords = () => {
    this.repoService.getData('api/klant/getKlanten')
      .subscribe(res => {
        // @ts-ignore
        this.dataSource.data = res.klanten as KlantDetailsView[];
        this.dataSource.filterPredicate = this.tableFilter();
      });
  }

  public getAllDropDownValues = () => {
    this.repoService.getData('api/klant/getDropDownValues')
      .subscribe(res => {
        // @ts-ignore
        const {teamDropDown, medewerkerDropDown} = res;
        this.teamDropDown = teamDropDown;
        this.medewerkersDropDown = medewerkerDropDown;
      });
  }

  public addBoekjaren = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Boekjaren opvoeren',
      saveButtonText: 'Boekjaren opvoeren',
    };
    const dialogRef = this.dialog.open(BoekjaarDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.repoService.post('api/boekjaar/add', data)
            .subscribe(res => {
              const result = res as BaseResponse;
              this.snackBarService.showSnackBar(result.message, 3000);
              if (result.success === true) {
              }
            });
        }}
    );
  }

  public addKlant = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Klant toevoegen',
      saveButtonText: 'Toevoegen Klant',
      teamDropDown: this.teamDropDown,
      medewerkersDropDown: this.medewerkersDropDown
    };
    const dialogRef = this.dialog.open(KlantDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.repoService.post('api/klant/add', data)
            .subscribe(res => {
              const result = res as BaseResponse;
              this.snackBarService.showSnackBar(result.message, 3000);
              if (result.success === true) {
                this.getAllKlantRecords();
              }
            });
        }}
    );
  }

  public redirectToUpdate = (element) => {
    const klantElement = element as KlantDetailsView;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Klant wijzigen',
      saveButtonText: 'Wijzigen klant',
      teamDropDown: this.teamDropDown,
      medewerkersDropDown: this.medewerkersDropDown,
      opdrachtenDropDown: this.opdrachtenDropDown,
      medewerkerId: klantElement.medewerkerId,
      naam: klantElement.naam,
      startdatum: klantElement.startdatum,
      einddatum: klantElement.einddatum,
      verantwoordelijkTeamId: klantElement.verantwoordelijkTeamId,
      planbaarDoorTeamIds: klantElement.planbaarDoorTeamIds
    };
    const dialogRef = this.dialog.open(KlantDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          data.id = klantElement.id;
          this.repoService.update('api/klant/update', data)
            .subscribe(res => {
              const result = res as BaseResponse;
              this.snackBarService.showSnackBar(result.message, 3000);
              if (result.success === true) {
                this.getAllKlantRecords();
              }
            });
        }}
    );
  }

    tableFilter(): (data: any, filter: string) => boolean {
      // noinspection UnnecessaryLocalVariableJS
      const filterFunction = (data, filter): boolean => {
        const searchTerms = JSON.parse(filter);
        return data.naam.toLocaleLowerCase().indexOf(searchTerms.klantNaam.toLocaleLowerCase()) !== -1;
      };
      return filterFunction;
    }


  public showBoekjarenDetails = (element) => {

  }

}
