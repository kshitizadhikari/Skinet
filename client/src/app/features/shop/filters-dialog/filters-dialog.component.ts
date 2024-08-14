import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { ShopService } from '../../../core/shop.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [MatDivider, MatButton, MatSelectionList, MatListOption],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss',
})
export class FiltersDialogComponent {
  shopService = inject(ShopService);
}
