import { Order } from './models/order';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/order').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list<Order>('/order').valueChanges();
  }

  viewOrder(orderId: string) {
    return this.db.object<Order>('/order/' + orderId).valueChanges();
  }

  cancelOrder(orderId: string) {
    return this.db.object('/order/' + orderId).remove();
  }

  getOrdersByUser(userId: string) {
    return this.db.list<Order>('/order', query => query.orderByChild('userId').equalTo(userId))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
      )
    );
  }
}