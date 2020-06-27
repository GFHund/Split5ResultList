import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap, switchMap, first } from 'rxjs/operators';
import { Result } from 'src/app/data/Result';
import { Observable, concat, of, forkJoin } from 'rxjs';
import { DriverService } from '../driver/driver.service';
import { EventService } from '../event/event.service';
import { TeamService } from '../team/team.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private db: AngularFirestore,
    private driverService: DriverService,
    private raceEventService: EventService,
    private teamService: TeamService) { }

  get(id: string) {
    // return this.db.collection('Event').snapshotChanges(); //.pipe(filter(ev => ev));
    return this.db.collection('Result').doc(id).get().pipe(map((val) => {
      return val.data();
    }));
  }
  getList(raceEventId: string) {
    return this.db.
    collection('Result', ref => ref.where('raceEventId', '==', raceEventId)).
    snapshotChanges()
    .pipe(map((results) => {
      const ret = [];
      for (const obj in results) {
        if (results[obj] !== undefined) {
          ret.push(results[obj].payload.doc.data());
        }
      }
      return ret;
    }));
  }

  getListFromEventAndDriver(raceEventId: string, driverId: string) {
    return this.db.
    collection('Result', ref => ref.where('raceEventId', '==', raceEventId).where('driverId', '==', driverId)).
    snapshotChanges()
    .pipe(map((results) => {
      // console.log(results);
      const ret = [];
      for (const obj in results) {
        // console.log(obj);
        if (results[obj] !== undefined) {
          // console.log(results[obj]);
          // console.log(results[obj].payload.doc.data());
          ret.push(results[obj].payload.doc.data());
        }
      }
      // return results;
      if (ret.length > 0) {
        return ret[0];
      } else {
        return null;
      }
      // return ret;
      // const ret = results[0].payload.doc.data();
      // return ret;
    }));
  }

  async getListFormatted(seasonId: string) {

    const driverList = await this.driverService.getList().pipe(first()).toPromise();
    const eventList = await this.raceEventService.getList(seasonId).pipe(first()).toPromise();

    const observables = [];
    for (const driverListIndex in driverList) {
      if (driverList.hasOwnProperty(driverListIndex)) {

        for (const eventListIndex in eventList) {
          if (eventList.hasOwnProperty(eventListIndex)) {
            observables.push(this.getListFromEventAndDriver(eventList[eventListIndex].id, driverList[driverListIndex].id).pipe(first()));
          }
        }
      }
    }
    const results = await forkJoin(observables).toPromise();
    console.log(results);
    const ret = [];
    for (const driverListIndex in driverList) {
      if (driverList.hasOwnProperty(driverListIndex)) {
        let totalPoints = 0;
        const raceResults = [];
        for (const eventListIndex in eventList) {
          if (eventList.hasOwnProperty(eventListIndex)) {
            let bFoundResult = false;
            for ( const resultsIndex in results ) {
              if ( results.hasOwnProperty(resultsIndex) ) {
                if (results[resultsIndex] === null) {
                  continue;
                }
                if (results[resultsIndex].driverId === driverList[driverListIndex].id &&
                  results[resultsIndex].raceEventId === eventList[eventListIndex].id) {
                    totalPoints += results[resultsIndex].points;
                    raceResults.push(results[resultsIndex]);
                    bFoundResult = true;
                    break;
                  }
              }
            }
            if (!bFoundResult) {
              raceResults.push({
                driverId: driverList[driverListIndex].id,
                points: 0,
                position: 0,
                time: 0,
                timeQuali: 0,
                qualiPosition: 0,
                raceEventId: eventList[eventListIndex].id
              });
            }
          }
        }
        ret.push({
          name: driverList[driverListIndex].name,
          results: raceResults,
          totalPoints,
        });
      }
    }

    return ret;
  }

  async getListFormattedForTeam(seasonId: string) {
    const teamList = await this.teamService.getList().pipe(first()).toPromise();
    const eventList = await this.raceEventService.getList(seasonId).pipe(first()).toPromise();
    const observables = [];
    for (const teamListIndex in teamList) {
      if (teamList.hasOwnProperty(teamListIndex)) {

        for (const eventListIndex in eventList) {
          if (eventList.hasOwnProperty(eventListIndex)) {
            observables.push(this.getListFromEventAndDriver(eventList[eventListIndex].id, teamList[teamListIndex].id).pipe(first()));
          }
        }
      }
    }

    const results = await forkJoin(observables).toPromise();
    console.log(results);
    const ret = [];

    for (const teamListIndex in teamList) {
      if (teamList.hasOwnProperty(teamListIndex)) {
        let totalPoints = 0;
        const raceResults = [];
        for (const eventListIndex in eventList) {
          if (eventList.hasOwnProperty(eventListIndex)) {
            let bFoundResult = false;
            for ( const resultsIndex in results ) {
              if ( results.hasOwnProperty(resultsIndex) ) {
                if (results[resultsIndex] === null) {
                  continue;
                }
                if (results[resultsIndex].teamId === teamList[teamListIndex].id &&
                  results[resultsIndex].raceEventId === eventList[eventListIndex].id) {
                    totalPoints += results[resultsIndex].points;
                    raceResults.push(results[resultsIndex]);
                    bFoundResult = true;
                    break;
                  }
              }
            }
            if (!bFoundResult) {
              raceResults.push({
                teamId: teamList[teamListIndex].id,
                points: 0,
                position: 0,
                time: 0,
                timeQuali: 0,
                qualiPosition: 0,
                raceEventId: eventList[eventListIndex].id
              });
            }
          }
        }
        ret.push({
          name: driverList[driverListIndex].name,
          results: raceResults,
          totalPoints,
        });
      }
    }
  }

  create(result: Result) {
    return this.db.collection('Result').add(result);
  }
  update(id: string, result: Result) {
    return this.db.collection('Result').doc(id).set(result);
  }
}
