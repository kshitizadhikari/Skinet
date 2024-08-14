import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../shared/pagination';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);

  types: string[] = [];
  brands: string[] = [];

  getProducts() {
    return this.http.get<Pagination<Product>>(
      `${this.baseUrl}products?pageSize=20`
    );
  }

  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(`${this.baseUrl}brands`).subscribe({
      next: (response) => (this.brands = response),
    });
  }
  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(`${this.baseUrl}types`).subscribe({
      next: (response) => (this.types = response),
    });
  }

}
