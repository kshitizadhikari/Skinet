import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/shop.service';
import { MatCard } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatCard, JsonPipe, ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  private shopService: ShopService = inject(ShopService);

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.shopService.getProducts().subscribe({
      next: (response) => (this.products = response.data),
      error: (error) => console.error('Error occurred:', error),
    });
  }
}
