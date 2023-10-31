import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces';
import { CartService } from 'src/app/shared/services/cart.service';
import { FireBaseService } from 'src/app/shared/services/fire-base.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product?: IProduct;
  prodSubscribe?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fb: FireBaseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.prodSubscribe = this.route.params
      .pipe(switchMap((params) => this.fb.getProductById(params['id'])))
      .subscribe({
        next: (res) => (this.product = res),
        error: (err: Error) => console.log(err),
      });
  }

  ngOnDestroy() {
    this.prodSubscribe?.unsubscribe();
  }

  addToCart() {
    const { id, title, price, photo } = this.product!;
    if(!id) return;
    this.cartService.save({
      id,
      title,
      price,
      photo: photo[0] ?? '',
    });
  }
}
