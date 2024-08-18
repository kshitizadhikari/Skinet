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
  quantityInCart = 0;
  quantity = 1;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: (response) => {
        this.product = response;
        this.updateQuantityInCart();
      },
      error: (error) => console.log(`Error getting product with id: ${id}`),
    });
  }

  updateCart() {
    if (!this.product) return;
    if (this.quantity > this.quantityInCart) {
      let itemsToAdd = this.quantity - this.quantityInCart;
      this.cartService.addItemToCart(this.product, itemsToAdd);
    } else {
      let itemsToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemsToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
    }
    this.updateQuantityInCart();
    console.log('Quantity: ' + this.quantity);
    console.log('CartQuantity: ' + this.quantityInCart);
  }

  updateQuantityInCart() {
    this.quantityInCart =
      this.cartService
        .cart()
        ?.items.find((x) => x.productId == this.product?.id)?.quantity || 0;
    if (this.quantityInCart != 0) {
      this.quantity = this.quantityInCart;
    } else {
      this.quantity = 1;
    }
  }

  getButtonText() {
    return this.quantityInCart > 0 ? 'Update Cart' : 'Add To Cart';
  }
}
