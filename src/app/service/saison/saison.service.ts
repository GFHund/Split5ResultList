import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Saison } from 'src/app/data/Saison';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaisonService {

  constructor(private db: AngularFirestore) { }

  get(id: string) {
    return this.db.collection('Saison').doc(id).get();
    // return this.db.collection('Saison').snapshotChanges(); //.pipe(filter(ev => ev));

  }
  getList() {
    return this.db.collection('Saison').snapshotChanges().pipe(map((results) => {
      const ret = [];
      for (const obj in results) {
        if (results[obj] !== undefined) {
          ret.push(results[obj].payload.doc.data());
        }
      }
      return ret;
    }));
  }
  create(saison: Saison) {
    return this.db.collection('Saison').add(saison);
  }
  update(id: string, saison: Saison) {
    return this.db.collection('Saison').doc(id).set(saison);
  }
  delete(id: string) {
    this.db.collection('Saison').doc(id).delete();
  }
}
