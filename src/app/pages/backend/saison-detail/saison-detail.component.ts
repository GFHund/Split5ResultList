import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Saison } from 'src/app/data/Saison';
import { RaceEvent } from 'src/app/data/RaceEvent';
import { Router, ActivatedRoute } from '@angular/router';
import { SaisonService } from 'src/app/service/saison/saison.service';
import { EventService } from 'src/app/service/event/event.service';


@Component({
  selector: 'app-saison-detail',
  templateUrl: './saison-detail.component.html',
  styleUrls: ['./saison-detail.component.scss']
})
export class SaisonDetailComponent implements OnInit, AfterViewChecked {

  @ViewChild('form', null) form: NgForm;

  eventName: string;
  saisonObj: Saison;
  events: Array<RaceEvent> = [];
  isNew: boolean;
  successMessage = '';
  errorMessage = '';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private saisonService: SaisonService,
              private eventService: EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.saisonId !== 'new') {
        this.saisonService.get(params.saisonId).subscribe((docChange) => {
          // console.log(docChange.data());
          // @ts-ignore
          this.saisonObj = docChange.data();
          setTimeout(() => {
            this.form.setValue(this.saisonObj);
          });
        });
        this.isNew = false;
      } else {
        this.saisonObj = {id: '', title: ''};
        this.isNew = true;
        setTimeout(() => {
          this.form.setValue(this.saisonObj);
        });
      }

      //
    });
  }

  ngAfterViewChecked() {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.saisonObj.title = form.value.title;
    if (this.isNew) {
      this.saisonService.create(this.saisonObj).then((doc) => {
        const id = doc.id;
        this.saisonObj.id = id;
        this.saisonService.update(id, this.saisonObj).then(() => {});
        this.successMessage = 'Data Successfully saved';
        this.router.navigateByUrl('backend/saison/' + id);
      }, (reson) => console.log(reson));
    } else {
      this.saisonService.update(this.saisonObj.id, this.saisonObj).then(() => {});
      // console.log(this.saisonObj);
    }
  }

}
