import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  order$;

  constructor(auth: AuthService,private orderService: OrderService, private router: Router) {
    this.order$ = auth.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
    }

}