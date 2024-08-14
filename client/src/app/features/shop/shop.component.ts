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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { ShopParams } from '../../shared/models/shopParams';
import { Pagination } from '../../shared/pagination';
import { Product } from '../../shared/product';

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
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products?: Pagination<Product>;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];
  private shopService: ShopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  pageSizeOptions = [5, 10, 15];
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
      next: (response) => (this.products = response),
      error: (error) => console.error('Error occurred:', error),
    });
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    this.shopParams.pageNumber = 1;
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
          this.shopParams.pageNumber = 1;
          this.getProducts();
        }
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  handleSearch(event: HTMLInputElement) {
    setTimeout(() => {
      this.shopParams.search = event.value;
      this.getProducts();
    }, 1000);
  }
}
