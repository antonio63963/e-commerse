import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces';
import { Observable, Subscribable, Subscription, map, of, switchMap, tap } from 'rxjs';
import { FireBaseService } from 'src/app/shared/services/fire-base.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  products?: IProduct[];
  getProdSub?: Subscription;

  constructor(
    private prodServ: ProductService,
    private fb: FireBaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('ROute: ', this.route);
    const a = this.route.params
      .pipe(
        switchMap((params) => {
          return this.fb.getProductsByType(params['products']);
        })
      )
      .subscribe({
        next: (x) => {
          this.products = x;
          console.log(x)
        },
        error: (err: Error) => console.log(err),
      });
  }

  ngOnDestroy() {
    if(this.getProdSub) {
      this.getProdSub.unsubscribe();
    }
  }
}
