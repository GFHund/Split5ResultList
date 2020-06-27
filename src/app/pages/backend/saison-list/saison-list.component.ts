import { Component, OnInit } from '@angular/core';
import { SaisonService } from 'src/app/service/saison/saison.service';
import { Saison } from 'src/app/data/Saison';

@Component({
  selector: 'app-saison-list',
  templateUrl: './saison-list.component.html',
  styleUrls: ['./saison-list.component.scss']
})
export class SaisonListComponent implements OnInit {

  saisons: Array<Saison> = [];

  constructor(private saisonService: SaisonService) { }

  ngOnInit() {
    this.saisonService.getList().subscribe((docChange) => {
      console.log(docChange);
      //console.log(docChange[0].payload.doc.data());
      this.saisons = docChange;
    });
  }



}
