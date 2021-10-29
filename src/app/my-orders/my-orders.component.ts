import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  order$;

  constructor(auth: AuthService,private orderService: OrderService, private router: Router) {
    this.order$ = auth.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
    }

}