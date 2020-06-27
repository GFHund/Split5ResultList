import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SaisonDetailComponent } from './pages/backend/saison-detail/saison-detail.component';

import { BackendIndexComponent } from './pages/backend/backend-index/backend-index.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { SaisonListComponent } from './pages/backend/saison-list/saison-list.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { RaceEventDetailComponent } from './pages/backend/race-event-detail/race-event-detail.component';
import { RaceEventListComponent } from './pages/backend/race-event-list/race-event-list.component';
import { ResultListComponent } from './pages/backend/result-list/result-list.component';
import { DriverListComponent } from './pages/backend/driver-list/driver-list.component';
import { FeSeisonDetailComponent } from './pages/fe-seison-detail/fe-seison-detail.component';
import { TablePointsRowComponent } from './components/table-points-row/table-points-row.component';
import { AuthDirective } from './directives/auth.directive';
import { ResultDetailComponent } from './pages/backend/result-detail/result-detail.component';
import { DriverPointsComponent } from './pages/driver-points/driver-points.component';
import { TeamPointsComponent } from './pages/team-points/team-points.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SaisonDetailComponent,
    BackendIndexComponent,
    SaisonListComponent,
    RaceEventDetailComponent,
    RaceEventListComponent,
    ResultListComponent,
    DriverListComponent,
    FeSeisonDetailComponent,
    TablePointsRowComponent,
    AuthDirective,
    ResultDetailComponent,
    DriverPointsComponent,
    TeamPointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
