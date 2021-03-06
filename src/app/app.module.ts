import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // <-- Http Client lives here
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatInputModule, MatNativeDateModule } from '@angular/material'; // <-- Dialog lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- dialog needs
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { RxResponsiveModule } from 'rx-responsive';
import { MatTableModule } from '@angular/material/table'; // <-- Material Table
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Angular5TimePickerModule } from 'angular5-time-picker';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';


/* Component */

import { AppComponent, LoginFormDialog, AskPasswordDialog, CompteUtilisateurDialog, CookieDialog, ChangePasswordDialog } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MembresComponent, ImportMembresDialog } from './membres/membres.component';
import { RencontresComponent, InterserieDialog } from './rencontres/rencontres.component';
import { HomeComponent } from './home/home.component';
import { MembreDetailComponent, InfosAftDialog, InfosGeneralesMembreDialog, ClubInfosDialog, ClassementDialog, CoordonneesDialog, ContactsDialog, SimulationClassementDialog, AnonymisationDialog } from './membre-detail/membre-detail.component';

/* Services */
import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from './local-storage.service';
import { LocaliteService } from './localite.service';
import { ChampionnatService } from './championnat.service';
import { ClubService } from './club.service';
import { MembreService } from './membre.service';
import { UserService } from './user.service';
import { TerrainService } from './terrain.service';
import { TraceService } from './trace.service';
import { AuthGuardService } from './auth-guard.service';
import { IsSecureGuardService } from './is-secure-guard.service';
import { RequestInterceptorService } from './request-interceptor.service';
import { RencontreDetailComponent, ResultatsDialog, DateTerrainDialog, MessagePoursuiteDialog, TracesRencontreDialog} from './rencontre-detail/rencontre-detail.component';
import { ClassementDetailComponent, RencontresDialog } from './classement-detail/classement-detail.component';
import { ClassementsComponent } from './classements/classements.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubDetailComponent, ClubDialog, ClubTerrainDialog } from './club-detail/club-detail.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { UtilisateurDetailComponent, UserDialog } from './utilisateur-detail/utilisateur-detail.component';
import { ChampionnatsComponent } from './championnats/championnats.component';
import { ChampionnatEquipesComponent, SelectionClubDialog } from './championnat-equipes/championnat-equipes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChampionnatDivisionsComponent } from './championnat-divisions/championnat-divisions.component';
import { ChampionnatDivisionDetailComponent, ChampionnatDescriptionDialog } from './championnat-division-detail/championnat-division-detail.component';
import {DivisionService} from './division.service';
import {EquipeService} from './equipe.service';
import {PouleService} from './poule.service';
import { ChampionnatPoulesComponent, ChangePouleDialog, EquipeTerrainDialog } from './championnat-poules/championnat-poules.component';
import {ChampionnatDetailComponent} from './championnats/championnat-detail.component';
import { ChampionnatRencontresComponent } from './championnat-rencontres/championnat-rencontres.component';
import {RencontreService} from './rencontre.service';
import { TerrainsComponent } from './terrains/terrains.component';
import { TerrainDetailComponent, TerrainDialog } from './terrain-detail/terrain-detail.component';
import {MatchService} from './match.service';
import {SetService} from './set.service';
import {ClassementService} from './classement.service';
import {ClassementMembreService} from './classement-membre.service';
import { MembreSelectionComponent } from './membre-selection/membre-selection.component';
import { DocumentsComponent } from './documents/documents.component';
import { PlanificationCriteriumComponent, JourneeCriteriumDialog, HoraireJourneeCriteriumDialog, ChoixRencontreCriteriumDialog } from './planification-criterium/planification-criterium.component';


@NgModule({
  declarations: [
    AppComponent,
    MembresComponent,
    ImportMembresDialog,
    RencontresComponent,
    InterserieDialog,
    HomeComponent,
    MembreDetailComponent,
    LoginFormDialog,
    AskPasswordDialog,
    CompteUtilisateurDialog,
    ChangePasswordDialog,
    CookieDialog,
    InfosAftDialog,
    SimulationClassementDialog,
    AnonymisationDialog,
    InfosGeneralesMembreDialog,
    ClubInfosDialog,
    ClassementDialog,
    CoordonneesDialog,
    ContactsDialog,
    ChampionnatDescriptionDialog,
    ChangePouleDialog,
    EquipeTerrainDialog,
    RencontreDetailComponent,
    ResultatsDialog,
    DateTerrainDialog,
    MessagePoursuiteDialog,
    TracesRencontreDialog,
    ClassementDetailComponent,
    RencontresDialog,
    ClassementsComponent,
    ClubsComponent,
    ClubDetailComponent,
    ClubDialog,
    UtilisateursComponent,
    UtilisateurDetailComponent,
    UserDialog,
    ChampionnatsComponent,
    ChampionnatEquipesComponent,
    SelectionClubDialog,
    DashboardComponent,
    ChampionnatDivisionsComponent,
    ChampionnatDivisionDetailComponent,
    ChampionnatPoulesComponent,
    ChampionnatRencontresComponent,
    TerrainsComponent,
    TerrainDetailComponent,
    TerrainDialog,
    ClubTerrainDialog,
    MembreSelectionComponent,
    DocumentsComponent,
    PlanificationCriteriumComponent,
    JourneeCriteriumDialog,
    HoraireJourneeCriteriumDialog,
    ChoixRencontreCriteriumDialog
  ],
  imports: [
    BrowserModule,
    RecaptchaModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule, // <-- #2 add to @NgModule imports
    RxResponsiveModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatSlideToggleModule,
    HttpClientModule,
    ChartsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    Angular5TimePickerModule
  ],
  entryComponents: [
      LoginFormDialog,
      AskPasswordDialog,
      CompteUtilisateurDialog,
      ChangePasswordDialog,
      CookieDialog,
      InfosAftDialog,
      SimulationClassementDialog,
      AnonymisationDialog,
      InfosGeneralesMembreDialog,
      CoordonneesDialog,
      ContactsDialog,
      ClubInfosDialog,
      ClassementDialog,
      ClubDialog,
      TerrainDialog,
      ClubTerrainDialog,
      UserDialog,
      SelectionClubDialog,
      ChampionnatDescriptionDialog,
      ChangePouleDialog,
      EquipeTerrainDialog,
      MembreSelectionComponent,
      ResultatsDialog,
      DateTerrainDialog,
      MessagePoursuiteDialog,
      TracesRencontreDialog,
      InterserieDialog,
      RencontresDialog,
      ImportMembresDialog,
      JourneeCriteriumDialog,
      HoraireJourneeCriteriumDialog,
      ChoixRencontreCriteriumDialog
  ],
  providers: [
    AuthenticationService,
    ChampionnatService,
    ClubService,
    DivisionService,
    EquipeService,
    PouleService,
    MembreService,
    RencontreService,
    MatchService,
    SetService,
    ClassementService,
    ClassementMembreService,
    TerrainService,
    TraceService,
    UserService,
    AuthGuardService,
    IsSecureGuardService,
    LocaliteService,
    LocalStorageService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService,multi: true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose:false}},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-BE'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: RECAPTCHA_LANGUAGE,useValue: 'fr'},
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
