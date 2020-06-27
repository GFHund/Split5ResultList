import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { BackendIndexComponent } from './pages/backend/backend-index/backend-index.component';
import { AuthGuard } from './auth/auth.guard';
import { SaisonListComponent } from './pages/backend/saison-list/saison-list.component';
import { SaisonDetailComponent } from './pages/backend/saison-detail/saison-detail.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import { RaceEventListComponent } from './pages/backend/race-event-list/race-event-list.component';
import { RaceEventDetailComponent } from './pages/backend/race-event-detail/race-event-detail.component';
import { ResultListComponent } from './pages/backend/result-list/result-list.component';
import { FeSeisonDetailComponent } from './pages/fe-seison-detail/fe-seison-detail.component';
import { ResultDetailComponent } from './pages/backend/result-detail/result-detail.component';
import { DriverPointsComponent } from './pages/driver-points/driver-points.component';
import { TeamPointsComponent } from './pages/team-points/team-points.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'saison-detail/:saisonId', component: FeSeisonDetailComponent, children: [
    {path: '', component: DriverPointsComponent},
    {path: 'team', component: TeamPointsComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'backend', component: BackendIndexComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/saison', component: SaisonListComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/saison/:saisonId', component: SaisonDetailComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/saison/new', component: SaisonDetailComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/race-event/:saisonId', component: RaceEventListComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/race-event/:saisonId/edit/:eventId', component: RaceEventDetailComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/race-event/:saisonId/new', component: RaceEventDetailComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/result/:saisonId/:eventId', component: ResultListComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'backend/result/:saisonId/:eventId/:resultId', component: ResultDetailComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
