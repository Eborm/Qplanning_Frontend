import {Component} from '@angular/core';
import {AuthenticationService, RepositoryService} from './_services';
import {User} from './_models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {GebruikerResetpasswordComponent} from './gebruikers/gebruiker-resetpassword';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'ZuydPlanning';
  username: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isAtLeastPlanner: boolean;
  isManager: boolean;
  email: string;

  constructor(
    private authenticationService: AuthenticationService,
    private repoService: RepositoryService, private dialog: MatDialog) {
    moment.locale('nl');
    this.isLoggedIn = false;
    this.authenticationService.currentUser.subscribe((currentUser: User) => {
      if (currentUser) {
          this.username = currentUser.voornaam + ' ' + currentUser.achternaam;
          this.isLoggedIn = true;
          this.isAdmin = currentUser.highestRole === 'Admin';
          this.isManager =
            (
              currentUser.highestRole === 'Planner'
              || currentUser.highestRole === 'Manager'
              || currentUser.highestRole === 'Admin'
          );
          this.isAtLeastPlanner =
            (currentUser.highestRole === 'Planner'
            || currentUser.highestRole  === 'Admin');
          this.email = currentUser.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  public redirectToResetPassword = () => {
    const dialogConfig = new MatDialogConfig();
    const email = this.email;
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
}
