import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../shared/product';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatButton,
    JsonPipe,
    MatIcon,
    MatCardContent,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product;

  cartService = inject(CartService);
}
