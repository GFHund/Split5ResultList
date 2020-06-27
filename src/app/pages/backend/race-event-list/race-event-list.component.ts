import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/service/event/event.service';
import { RaceEvent } from 'src/app/data/RaceEvent';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-race-event-list',
  templateUrl: './race-event-list.component.html',
  styleUrls: ['./race-event-list.component.scss']
})
export class RaceEventListComponent implements OnInit {

  saisonId: string;
  raceEvents: Array<RaceEvent> = [];

  constructor(private route: ActivatedRoute, private raceEventService: EventService) { }

  ngOnInit() {
    this.route.params.pipe(flatMap((params) => {
      this.saisonId = params.saisonId;
      return this.raceEventService.getList(this.saisonId);
    })).subscribe((results) => {
      console.log(results);
      // @ts-ignore
      this.raceEvents = results;

    });
  }

}
