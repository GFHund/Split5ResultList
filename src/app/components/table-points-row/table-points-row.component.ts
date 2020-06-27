import { Component, OnInit, Input } from '@angular/core';
import { Driver } from 'src/app/data/Driver';
import { RaceEvent } from 'src/app/data/RaceEvent';
import { ResultService } from 'src/app/service/result/result.service';

@Component({
  selector: '[app-table-points-row]',
  templateUrl: './table-points-row.component.html',
  styleUrls: ['./table-points-row.component.scss']
})
export class TablePointsRowComponent implements OnInit {

  @Input() driver: Driver;
  @Input() raceEvents: Array<RaceEvent>;

  constructor(private resultService: ResultService) { }

  ngOnInit() {
  }

  async getPoints(driverId: string, raceEventId: string) {
    const obj = await this.resultService.getListFromEventAndDriver(raceEventId, driverId).toPromise();
    //return obj.points;
  }

}
