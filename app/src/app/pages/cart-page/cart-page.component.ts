import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/shared/interfaces';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  products: CartProduct[] = [];
  totalSumm: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.getOrder();
    this.totalSumm = this.products.reduce((acc, prod) => (acc += prod.summ), 0);
  }
}
