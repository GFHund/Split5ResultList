import { Component, OnInit } from '@angular/core';
import { Saison } from 'src/app/data/Saison';
import { SaisonService } from 'src/app/service/saison/saison.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  saisons: Array<Saison> = [];

  constructor(private saisonService: SaisonService) {  }

  ngOnInit() {
    this.saisonService.getList().subscribe((result) => {
      this.saisons = result;
    })
  }

}
