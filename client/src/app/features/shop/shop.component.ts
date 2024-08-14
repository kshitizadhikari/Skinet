import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/shop.service';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard,
    JsonPipe,
    ProductItemComponent,
    MatMenu,
    MatButton,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];
  selectedSort: string = '';
  private shopService: ShopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService
      .getProducts(this.selectedBrands, this.selectedTypes, this.selectedSort)
      .subscribe({
        next: (response) => (this.products = response.data),
        error: (error) => console.error('Error occurred:', error),
      });
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];

    if (selectedOption) this.selectedSort = selectedOption.value;
    this.getProducts();
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
          this.getProducts();
        }
      },
    });
  }
}
