import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ShopComponent } from "./features/shop/shop.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Changed from styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'client';

  ngOnInit(): void {}
}
