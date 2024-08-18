import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);
  itemCount = computed(() => {
    return this.cart()?.items.reduce((sum, item) => sum + item.quantity, 0);
  });

  totals = computed(() => {
    const cart = this.cart();
    if (!cart) return null;
    const subTotal = cart.items.reduce(
      (t, item) => item.price * item.quantity + t,
      0
    );
    const discount = 0;
    const deliveryCharge = 0;
    const finalTotal = subTotal - discount + deliveryCharge;
    return {
      subTotal,
      discount,
      deliveryCharge,
      finalTotal,
    };
  });

  getCart(id: string): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl + 'cart?id=' + id).pipe(
      map((cart) => {
        this.cart.set(cart);
        return cart;
      })
    );
  }

  setCart(cart: Cart) {
    this.http.post<Cart>(this.baseUrl + 'cart', cart).subscribe({
      next: (cart) => this.cart.set(cart),
    });
  }

  addItemToCart(item: CartItem | Product, quantity = 1) {
    const cart = this.cart() ?? this.createCart();
    if (this.isProduct(item)) {
      item = this.mapProductToCartItem(item);
    }
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  addOrUpdateItem(
    items: CartItem[],
    item: CartItem,
    quantity: number
  ): CartItem[] {
    const index = items.findIndex((x) => x.productId === item.productId);
    if (index == -1) {
      item.quantity = quantity;
      items.push(item);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private mapProductToCartItem(item: Product): CartItem {
    return {
      productId: item.id,
      productName: item.name,
      brand: item.brand,
      type: item.type,
      pictureUrl: item.pictureUrl,
      price: item.price,
      quantity: 0,
    };
  }

  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id !== undefined;
  }

  private createCart() {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  removeItemFromCart(productId: number, quantity = 1) {
    const cart = this.cart();
    if (!cart) return;

    const index = cart.items.findIndex((x) => x.productId === productId);
    if (index === -1) return;

    cart.items[index].quantity -= quantity;

    if (cart.items[index].quantity <= 0) {
      this.removeProductFromCart(productId);
    } else {
      this.setCart(cart);
    }
  }

  removeProductFromCart(productId: number) {
    const cart = this.cart();
    if (!cart) return;

    const index = cart.items.findIndex((x) => x.productId === productId);
    if (index === -1) return;

    cart.items.splice(index, 1);

    if (cart.items.length === 0) {
      this.deleteCart();
    } else {
      this.setCart(cart);
    }
  }

  deleteCart() {
    const cartId = this.cart()?.id;
    if (!cartId) return;

    this.http.delete(`${this.baseUrl}cart?id=${cartId}`).subscribe({
      next: () => {
        localStorage.removeItem('cart_id');
        this.cart.set(null);
      },
    });
  }
}
