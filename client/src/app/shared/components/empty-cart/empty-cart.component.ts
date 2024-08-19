import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [MatIcon, MatButton, RouterLink],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.scss',
})
export class EmptyCartComponent {}
