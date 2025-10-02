import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomMaterialModule } from './core/material.module';
import { routing } from './core/app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// Components declaration
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { GebruikerResetpasswordComponent } from './gebruikers/gebruiker-resetpassword';
import { GebruikerOverzichtComponent } from './gebruikers/gebruiker-overzicht';
import { GebruikerDetailsComponent } from './gebruikers/gebruiker-details';
import { PlanningListComponent } from './home/planning-list';
import { NonBillableListComponent } from './home/non-billable-list';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { BoekingenOverzichtComponent } from './boeking/boekingen-overzicht';
import { BoekingDetailsComponent } from './boeking/boeking-details/boeking-details.component';
import { ConfirmationComponent } from './modal';
import { GebruikerRolesComponent } from './gebruikers/gebruiker-roles';
import { MedewerkerDetailsComponent } from './medewerker/medewerker-details/medewerker-details.component';
import { MedewerkerOverzichtComponent } from './medewerker/medewerker-overzicht/medewerker-overzicht.component';
import { KlantOverzichtComponent } from './klant/klant-overzicht/klant-overzicht.component';
import { KlantDetailsComponent } from './klant/klant-details/klant-details.component';
import { MedewerkerPlanningComponent } from './boeking/medewerker-planning/medewerker-planning.component';
import { KlantPlanningComponent } from './boeking/klant-planning/klant-planning.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import { BoekjaarDetailsComponent } from './boekjaar/boekjaar-details/boekjaar-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GebruikerResetpasswordComponent,
    GebruikerOverzichtComponent,
    GebruikerDetailsComponent,
    PlanningListComponent,
    NonBillableListComponent,
    BoekingenOverzichtComponent,
    BoekingDetailsComponent,
    ConfirmationComponent,
    GebruikerRolesComponent,
    MedewerkerDetailsComponent,
    MedewerkerOverzichtComponent,
    KlantOverzichtComponent,
    KlantDetailsComponent,
    MedewerkerPlanningComponent,
    KlantPlanningComponent,
    BoekjaarDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    CustomMaterialModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }},
    { provide: MAT_DATE_LOCALE, useValue: 'nl-NL' }
    ],
  bootstrap: [AppComponent],
  entryComponents: [GebruikerResetpasswordComponent, GebruikerDetailsComponent, GebruikerRolesComponent
    , BoekingDetailsComponent, ConfirmationComponent, MedewerkerDetailsComponent, KlantDetailsComponent
    , BoekjaarDetailsComponent]
})
export class AppModule { }
