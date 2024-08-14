import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/shop.service';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatButton } from '@angular/material/button';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatCard, JsonPipe, ProductItemComponent, MatButton, MatIcon],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  private shopService: ShopService = inject(ShopService);
  private dialogService = inject(MatDialog);

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

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.selectedBrands,
        selectedTypes: this.selectedTypes,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.selectedBrands = result.selectedBrands;
          this.selectedTypes = result.selectedTypes;
          this.shopService
            .getProducts(this.selectedBrands, this.selectedTypes)
            .subscribe({
              next: (response) => (this.products = response.data),
              error: (error) => console.log(error),
            });
        }
      },
    });
  }
}
