import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  getAll() {
    return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  get(productId) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  delete(productID) {
    return this.db.object('/products/' + productID).remove();
  }
}