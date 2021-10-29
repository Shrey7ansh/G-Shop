import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', Query => Query.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({ key: a.payload.key, ...(a.payload.val() as {}) }))
       )
    );
  }
}
