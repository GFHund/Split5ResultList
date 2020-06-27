import { Component, OnInit } from '@angular/core';
import { RaceEvent } from 'src/app/data/RaceEvent';
import { Driver } from 'src/app/data/Driver';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/service/event/event.service';
import { DriverService } from 'src/app/service/driver/driver.service';
import { ResultService } from 'src/app/service/result/result.service';

@Component({
  selector: 'app-driver-points',
  templateUrl: './driver-points.component.html',
  styleUrls: ['./driver-points.component.scss']
})
export class DriverPointsComponent implements OnInit {

  saisonId: string;
  raceEvents: Array<RaceEvent> = [];
  drivers: Array<Driver> = [];
  results;

  constructor(
    private route: ActivatedRoute,
    private raceEventService: EventService,
    private driverService: DriverService,
    private resultService: ResultService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.saisonId = params.saisonId;
      this.raceEventService.getList(this.saisonId).subscribe((raceEvents) => {
        this.raceEvents = raceEvents;
      });
      // this.resultService.getListFormatted(this.saisonId);

      this.resultService.getListFormatted(this.saisonId).then((val) => {
        val.sort((a, b) => {
          return b.totalPoints - a.totalPoints;
        });

        this.results = val;
      });

    });
    this.driverService.getList().subscribe((drivers) => {
      this.drivers = drivers;
    });
  }

}
