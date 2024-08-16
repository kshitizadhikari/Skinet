import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, CartItemComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
}
