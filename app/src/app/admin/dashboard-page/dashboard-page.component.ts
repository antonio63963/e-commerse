import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  products?: IProduct[];
  prodSubscription?: Subscription;

  constructor(private productServise: ProductService) {}

  ngOnInit(): void {
    this.prodSubscription = this.productServise
      .getAll()
      .subscribe((resp) => (this.products = resp));
  }
  
  ngOnDestroy(): void {
    console.log('Dashboard unsubscribed...');
    this.prodSubscription?.unsubscribe();
  }
}
