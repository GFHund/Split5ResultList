import { Injectable } from '@angular/core';
import { Driver } from 'src/app/data/Driver';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team } from 'src/app/data/Team';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private db: AngularFirestore) { }

  getList() {
    return this.db.
    collection('Team').
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

  create(team: Team) {
    return this.db.collection('Team').add(team);
  }

  update(id: string, team: Team) {
    return this.db.collection('Team').doc(id).set(team);
  }
}
