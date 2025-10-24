import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {BaseResponse, DropDown, MedewerkerDetailsView} from '../../_models';
import {RepositoryService, SnackbarService} from '../../_services';
import {MedewerkerDetailsComponent} from '../medewerker-details/medewerker-details.component';

@Component({
  selector: 'app-medewerker-overzicht',
  templateUrl: './medewerker-overzicht.component.html',
  styleUrls: ['./medewerker-overzicht.component.css']
})
export class MedewerkerOverzichtComponent implements OnInit , AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['Voornaam'
    , 'Email', 'Tarief', 'InternTarief'
    , 'Function', 'Team', 'ResponsibleTeams', 'IsActief', 'update'];
  public dataSource = new MatTableDataSource<MedewerkerDetailsView>();
  teamDropDown: DropDown[];
  medewerkerFunctieDropDown: DropDown[];

  constructor(private repoService: RepositoryService, private dialog: MatDialog, private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.getAllMedewerkers();
    this.getAllDropDownValues();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllMedewerkers = () => {
    this.repoService.getData('api/medewerker/getMedewerkers')
      .subscribe(res => {
        // @ts-ignore
        this.dataSource.data = res.medewerkers as MedewerkerDetailsView[];
      });
  }

  public getAllDropDownValues = () => {
    this.repoService.getData('api/medewerker/getDropDownValues')
      .subscribe(res => {
        // @ts-ignore
        const {teamDropDown, medewerkerFunctieDropDown} = res;
        this.teamDropDown = teamDropDown;
        this.medewerkerFunctieDropDown = medewerkerFunctieDropDown;
      });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public addMedewerker = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Medewerker toevoegen',
      saveButtonText: 'Medewerker toevoegen',
      teamDropDown: this.teamDropDown,
      medewerkerFunctieDropDown: this.medewerkerFunctieDropDown
    };
    const dialogRef = this.dialog.open(MedewerkerDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.repoService.post('api/medewerker/add', data)
            .subscribe(res => {
              const result = res as BaseResponse;
              this.snackBarService.showSnackBar(result.message, 3000);
              if (result.success === true) {
                this.getAllMedewerkers();
              }
            });
        }}
    );
  }

  public redirectToUpdate = (element) => {
    const medewerkerElement = element as MedewerkerDetailsView;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Medewerker bijwerken',
      saveButtonText: 'Medewerker bijwerken',
      teamDropDown: this.teamDropDown,
      medewerkerFunctieDropDown: this.medewerkerFunctieDropDown,
      medewerkerId: medewerkerElement.id,
      voornaam: medewerkerElement.voornaam,
      tussenVoegsel: medewerkerElement.tussenVoegsel,
      achternaam: medewerkerElement.achternaam,
      email: medewerkerElement.email,
      tarief: medewerkerElement.tarief,
      internTarief: medewerkerElement.internTarief,
      medewerkerFunctieId: medewerkerElement.medewerkerFunctieId,
      teamId: medewerkerElement.teamId,
      planbaarDoorTeamIds: medewerkerElement.planbaarDoorTeamIds
    };
    const dialogRef = this.dialog.open(MedewerkerDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          data.id = medewerkerElement.id;
          this.repoService.update('api/medewerker/update', data)
            .subscribe(res => {
              const result = res as BaseResponse;
              this.snackBarService.showSnackBar(result.message, 3000);
              if (result.success === true) {
                this.getAllMedewerkers();
              }
            });
        }}
    );
  }

  public redirectToActivate = (id: number, isActief: boolean) => {
    this.repoService.post('api/medewerker/delete', {id, isActief})
      .subscribe(res => {
        const result = res as BaseResponse;
        this.snackBarService.showSnackBar(result.message, 3000);
        if (result.success === true) {
          this.getAllMedewerkers();
        }
      });
  }

}
