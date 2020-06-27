import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event/event.service';
import { flatMap } from 'rxjs/operators';
import { RaceEvent } from 'src/app/data/RaceEvent';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-race-event-detail',
  templateUrl: './race-event-detail.component.html',
  styleUrls: ['./race-event-detail.component.scss']
})
export class RaceEventDetailComponent implements OnInit {

  @ViewChild('form', null) form: NgForm;

  raceEventObj: RaceEvent;
  isNew = false;
  saisonId = '';

  constructor(private route: ActivatedRoute, private raceEventService: EventService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.saisonId = params.saisonId;
      if (params.eventId !== undefined) {
        this.isNew = false;
        this.raceEventService.get(params.eventId).subscribe((result) => {
          // @ts-ignore
          this.raceEventObj = result.data();
          setTimeout(() => {
            this.form.setValue(this.raceEventObj);
          });

        });
      } else {
        this.isNew = true;
        this.raceEventObj = {
          id: '',
          title: '',
          icon: '',
          date: '',
          saisonId: this.saisonId
        };
        setTimeout(() => {
          this.form.setValue(this.raceEventObj);
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    this.raceEventObj = form.value;
    if (this.isNew) {
      this.raceEventService.create(this.raceEventObj).then((createdDoc) => {
        const id = createdDoc.id;
        this.raceEventObj.id = id;
        this.raceEventService.update(id, this.raceEventObj).then(() => {});
        this.router.navigateByUrl('backend/race-event/' + this.saisonId + '/edit/' + this.raceEventObj.id);
      });
    } else {
      this.raceEventService.update(this.raceEventObj.id, this.raceEventObj).then(() => {});
    }
  }

}
