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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { ShopParams } from '../../shared/models/shopParams';

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
    MatPaginatorModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];
  private shopService: ShopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  shopParams = new ShopParams();
  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => (this.products = response.data),
      error: (error) => console.error('Error occurred:', error),
    });
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];

    if (selectedOption) this.shopParams.sort = selectedOption.value;
    this.getProducts();
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.getProducts();
        }
      },
    });
  }
}
