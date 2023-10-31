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

  getCartProducts() {
    this.products = this.cartService.getOrder();
    this.totalSumm = this.products.length
      ? this.products.reduce((acc, prod) => (acc += prod.summ), 0)
      : 0;
  }

  ngOnInit(): void {
    this.getCartProducts();
  }

  addProduct(id: string) {
    this.cartService.incAmount(id);
    this.getCartProducts();
  }
  minusProduct(id: string) {
    this.cartService.decAmount(id);
    this.getCartProducts();
  }
  deleteProduct(id: string) {
    this.cartService.delete(id);
    this.getCartProducts();
  }
}
