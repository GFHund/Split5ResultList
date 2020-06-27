import { Component, OnInit } from '@angular/core';
import { RaceEvent } from 'src/app/data/RaceEvent';
import { Driver } from 'src/app/data/Driver';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/service/event/event.service';
import { DriverService } from 'src/app/service/driver/driver.service';
import { ResultService } from 'src/app/service/result/result.service';

@Component({
  selector: 'app-fe-seison-detail',
  templateUrl: './fe-seison-detail.component.html',
  styleUrls: ['./fe-seison-detail.component.scss']
})
export class FeSeisonDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private raceEventService: EventService,
              private driverService: DriverService,
              private resultService: ResultService) { }

  ngOnInit() {
  }

}
