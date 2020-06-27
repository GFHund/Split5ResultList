import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {RaceEvent} from '../../data/RaceEvent';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private db: AngularFirestore) { }

  get(id: string) {
    // return this.db.collection('Event').snapshotChanges(); //.pipe(filter(ev => ev));
    return this.db.collection('Event').doc(id).get();
  }
  getList(saisonId: string) {
    return this.db.
    collection('Event', ref => ref.where('saisonId', '==', saisonId)).
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
  getListFromSaison(saisonId: string) {
    return this.db.collection('Event', ref => ref.where('saisonId', '==', saisonId)).snapshotChanges();
  }
  create(event: RaceEvent) {
    return this.db.collection('Event').add(event);
  }
  update(id: string, event: RaceEvent) {
    return this.db.collection('Event').doc(id).set(event);
  }
}
