import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/service/result/result.service';
import { Result } from 'src/app/data/Result';
import { Driver } from 'src/app/data/Driver';
import { DriverService } from 'src/app/service/driver/driver.service';
import { TeamService } from 'src/app/service/team/team.service';
import { Team } from 'src/app/data/Team';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit, AfterViewInit {


  @ViewChild('formResult', null) form: NgForm;

  saisonId: string;
  raceEventId: string;
  resultId: string;
  resultObj: Result;
  drivers: Array<Driver>;
  teams: Array<Team>;

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private driverService: DriverService,
    private teamService: TeamService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.saisonId = params.saisonId;
      this.raceEventId = params.eventId;
      this.resultId = params.resultId;
      this.resultService.get(this.resultId).subscribe((resultObj) => {
        // @ts-ignore
        this.resultObj = resultObj;
        this.resultObj = this.checkObj(this.resultObj);
        console.log(this.resultObj);
        setTimeout(() => {
          this.form.setValue(this.resultObj);
        });
      });
    });
    this.driverService.getList().subscribe((drivers) => {
      this.drivers = drivers;
    });
    this.teamService.getList().subscribe((teams) => {
      this.teams = teams;
    });
  }

  checkObj(checkObj: Result) {
    if (checkObj.qualiPosition === undefined) {
      checkObj.qualiPosition = -1;
    }
    if (checkObj.timeQuali === undefined) {
      checkObj.timeQuali = '';
    }
    if (checkObj.time === undefined) {
      checkObj.time = '';
    }
    if (checkObj.teamId === undefined) {
      checkObj.teamId = '';
    }
    return checkObj;
  }

  ngAfterViewInit(): void {

  }


  onSubmitResult(form: NgForm) {
    // this.saisonObj.title = form.value.title;
    this.resultObj.driverId = form.value.driverId;
    this.resultObj.points = form.value.points;
    this.resultObj.position = form.value.position;
    this.resultObj.qualiPosition = form.value.qualiPosition;
    this.resultObj.time = form.value.time;
    this.resultObj.timeQuali = form.value.timeQuali;
    this.resultObj.teamId = form.value.teamId;
    console.log(this.resultObj);
    this.resultService.update(this.resultObj.id, this.resultObj).then();
  }

}
