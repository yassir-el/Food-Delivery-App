import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(orderId).subscribe(data => {
      this.order = data;
    });
  }

  markAsDelivered() {
    this.orderService.updateOrderStatus(this.order.id, 'Delivered').subscribe(response => {
      this.order.status = 'Delivered';
    });
  }
}
