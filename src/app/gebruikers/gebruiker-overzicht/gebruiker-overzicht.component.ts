import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from '../../_services';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {GebruikerDetailsComponent} from '../gebruiker-details';
import {ModalMode} from '../../_enums/modalMode';
import {BaseResponse, Role, User} from '../../_models';
import {GebruikerResetpasswordComponent} from '../gebruiker-resetpassword';
import {ConfirmationComponent} from '../../modal';
import {GebruikerRolesComponent} from '../gebruiker-roles';

@Component({
  selector: 'app-gebruiker',
  templateUrl: './gebruiker-overzicht.component.html',
  styleUrls: ['./gebruiker-overzicht.component.css']
})
export class GebruikerOverzichtComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // tslint:disable-next-line:max-line-length
  public displayedColumns = ['Voornaam', 'Achternaam', 'Email', 'Gebruikersnaam', 'Roles', 'roleButtons', 'resetpassword', 'update', 'delete'];
  public dataSource = new MatTableDataSource<User>();
  roles: Role[];

  constructor(private repoService: RepositoryService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllRoles();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllUsers = () => {
    this.repoService.getData('api/account/getAllUsers')
      .subscribe(res => {
        // @ts-ignore
        this.dataSource.data = res.users as User[];
      });
  }

  public getAllRoles = () => {
    this.repoService.getData('api/account/getAllRoles')
      .subscribe(res => {
        this.roles = res as Role[];
      });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public addUser = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Gebruiker toevoegen',
      modalMode: ModalMode.add,
      saveTitle: 'Gebruiker toevoegen',
    };
    const dialogRef = this.dialog.open(GebruikerDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.repoService.post('api/account/add', data)
            .subscribe(res => {
              const response = res as BaseResponse;
              if (response.success) {
                this.getAllUsers();
              }
              console.log('Method output:', res);
            });
        }
      }
    );
  }

  public redirectToResetPassword = (id: string, email: string) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      email,
      title: 'Wachtwoord resetten'
    };
    const dialogRef = this.dialog.open(GebruikerResetpasswordComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.repoService.post('api/account/resetPassword', data)
            .subscribe(res => {
              console.log('Method output:', res);
            });
        }
      }
    );
  }

  public redirectToUpdate = (element: object) => {
    const user = element as User;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Gebruiker wijzigen',
      modalMode: ModalMode.edit,
      saveTitle: 'Gebruiker wijzigen',
      id: user.id,
      email: user.email,
      voornaam: user.voornaam,
      achternaam: user.achternaam
    };
    const dialogRef = this.dialog.open(GebruikerDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.repoService.update('api/account/update', { id: data.id, voornaam: data.voornaam
            , achternaam: data.achternaam, email: data.email, userName: data.userName})
            .subscribe(res => {
              const response = res as BaseResponse;
              if (response.success) {
                this.getAllUsers();
              }
              console.log('Method output:', res);
            });
        }
      }
    );
  }

  public redirectToDelete = (email: string) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Gebruiker verwijderen',
      removeMessage: 'Weet u zeker dat u gebruiker met email adres: ' + email + ' wilt verwijderen?'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'delete') {
          this.repoService.post('api/account/delete', {email})
            .subscribe(res => {
              const response = res as BaseResponse;
              if (response.success) {
                this.getAllUsers();
              }
              console.log('Method output:', res);
            });
        }
      }
    );
  }

    public redirectToAddRole = (email: string) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        title: 'Rol toevoegen',
        saveButtonText: 'Rol toevoegen',
        roles: this.roles,
        email
      };
      const dialogRef = this.dialog.open(GebruikerRolesComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.repoService.post('api/account/addClaimRoleToUser', data)
              .subscribe(res => {
                const response = res as BaseResponse;
                if (response.success) {
                  this.getAllUsers();
                }
                console.log('Method output:', res);
              });
          }
        }
      );
    }

  public redirectToDeleteRole = (email: string) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Rol verwijderen',
      saveButtonText: 'Rol verwijderen',
      roles: this.roles,
      email
    };
    const dialogRef = this.dialog.open(GebruikerRolesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.repoService.post('api/account/deleteClaimRoleFromUser', data)
            .subscribe(res => {
              const response = res as BaseResponse;
              if (response.success) {
                this.getAllUsers();
              }
              console.log('Method output:', res);
            });
        }
      }
    );
  }

}
