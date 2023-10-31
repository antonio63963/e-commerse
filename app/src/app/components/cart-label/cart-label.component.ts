import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-label',
  templateUrl: './cart-label.component.html',
  styleUrls: ['./cart-label.component.scss']
})
export class CartLabelComponent {
  constructor(public products: CartService) {}
}
