import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { Product } from '../../../shared/product';
import { ShopService } from '../../../core/services/shop.service';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatDivider,
    FormsModule,
    MatInput,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  product?: Product;
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: (response) => (this.product = response),
      error: (error) => console.log(`Error getting product with id: ${id}`),
    });
  }
}
