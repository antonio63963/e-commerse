import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
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

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(private route: ActivatedRoute, private fb: FireBaseService) {}

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
}
