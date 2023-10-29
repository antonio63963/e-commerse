import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces';
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
    private fb: FireBaseService
  ) {}

  ngOnInit(): void {
    this.prodSubscribe = this.route.params.pipe(
      switchMap((params) => this.fb.getProductById(params['id']))
    ).subscribe({
      next: (res) => this.product = res,
      error: (err: Error) => console.log(err)
    });
  }

  ngOnDestroy() {
    this.prodSubscribe?.unsubscribe();
  }
}
