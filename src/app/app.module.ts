import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http'; // <-- Http Client lives here
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatInputModule } from '@angular/material'; // <-- Dialog lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- dialog needs
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';

/* Component */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MembresComponent } from './membres/membres.component';
import { RencontresComponent } from './rencontres/rencontres.component';
import { HomeComponent } from './home/home.component';
import {MembreDetailComponent, HistoriqueClassementDialog, InfosGeneralesMembreDialog } from './membre-detail/membre-detail.component';

/* Services */
import { MembreService } from './membre.service';
import { RencontreDetailComponent } from './rencontre-detail/rencontre-detail.component';
import { ClassementDetailComponent } from './classement-detail/classement-detail.component';
import { ClassementsComponent } from './classements/classements.component';


@NgModule({
  declarations: [
    AppComponent,
    MembresComponent,
    RencontresComponent,
    HomeComponent,
    MembreDetailComponent,
    HistoriqueClassementDialog,
    InfosGeneralesMembreDialog,
    RencontreDetailComponent,
    ClassementDetailComponent,
    ClassementsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatInputModule,
    MatRadioModule
  ],
  entryComponents: [
      HistoriqueClassementDialog,
      InfosGeneralesMembreDialog
  ],
  providers: [
    MembreService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose:true}}
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
