import { Component, OnInit, ViewChild } from '@angular/core';
import { Result } from 'src/app/data/Result';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/service/result/result.service';
import { DriverService } from 'src/app/service/driver/driver.service';
import { Driver } from 'src/app/data/Driver';
import { TeamService } from 'src/app/service/team/team.service';
import { Team } from 'src/app/data/Team';


@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  @ViewChild('#resultForm', null) resultForm: NgForm;
  @ViewChild('#driverForm', null) driverForm: NgForm;
  @ViewChild('formTeam', null) teamForm: NgForm;

  saisonId: string;
  raceEventId: string;
  results: Array<Result> = [];
  drivers: Array<Driver> = [];
  teams: Array<Team> = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resultService: ResultService,
              private driverService: DriverService,
              private teamService: TeamService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.saisonId = params.saisonId;
      this.raceEventId = params.eventId;
      this.resultService.getList(this.raceEventId).subscribe((results) => {
        this.results = results;
      });
      this.driverService.getList().subscribe((drivers) => {
        this.drivers = drivers;
      });
      this.teamService.getList().subscribe((teams) => {
        this.teams = teams;
      })
    });
  }

  getDriver(driverId: string) {
    const result =  this.drivers.filter(driver => driver.id === driverId);
    if (result[0] === undefined) {
      return '';
    }
    return result[0].name;
  }
  getTeam(teamId: string) {
    const result = this.teams.filter(team => team.id === teamId);
    if (result[0] === undefined){
      return '';
    }
    return result[0].name;
  }

  onSubmitResult(form: NgForm) {
    const result = form.value;
    result.raceEventId = this.raceEventId;
    this.resultService.create(result).then((res) => {
      const id = res.id;
      result.id = id;
      this.resultService.update(id, result).then(() => {});
    });

  }

  onSubmitDriver(form: NgForm) {
    const driver = form.value;
    this.driverService.create(driver).then((res) => {
      const id = res.id;
      driver.id = id;
      this.driverService.update(id, driver).then(() => {
        //this.drivers.push(driver);
      });
    });
  }

  onSubmitTeam(form: NgForm) {
    const team = form.value;
    this.teamService.create(team).then((res) => {
      const id = res.id;
      team.id = id;
      this.teamService.update(id, team).then(() => {});
    })
  }

}
