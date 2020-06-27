import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Driver } from 'src/app/data/Driver';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private db: AngularFirestore) { }

  get(id: string) {
    // return this.db.collection('Event').snapshotChanges(); //.pipe(filter(ev => ev));
    return this.db.collection('Driver').doc(id).get();
  }
  getList() {
    return this.db.
    collection('Driver'  ).
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

  create(result: Driver) {
    return this.db.collection('Driver').add(result);
  }
  update(id: string, result: Driver) {
    return this.db.collection('Driver').doc(id).set(result);
  }
}
