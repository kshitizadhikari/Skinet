import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProducts(brands?: string[], types?: string[]) {
    let params = new HttpParams().set('pageSize', '20');

    if (brands && brands.length > 0) {
      params = params.append('brands', brands.join(','));
    }

    if (types && types.length > 0) {
      params = params.append('types', types.join(','));
    }

    console.log(params.toString());
    return this.http.get<Pagination<Product>>(`${this.baseUrl}products`, {
      params,
    });
  }

  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(`${this.baseUrl}products/brands`).subscribe({
      next: (response) => (this.brands = response),
    });
  }
  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(`${this.baseUrl}products/types`).subscribe({
      next: (response) => (this.types = response),
    });
  }
}
