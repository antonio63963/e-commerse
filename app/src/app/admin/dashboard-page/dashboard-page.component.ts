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
  products: IProduct[] = [];
  prodSubscription?: Subscription;
  isLoaded = false;

  constructor(private productServise: ProductService) {}

  ngOnInit(): void {
    this.prodSubscription = this.productServise.getAll().subscribe((resp) => {
      this.products = resp;
      this.isLoaded = true;
    });
  }

  remove(id: string) {
    console.log('Delete test')
    const delSub: Subscription = this.productServise.deleteById(id).subscribe({
      next: (_) => {
        this.products = this.products.filter((prod) => prod.id !== id);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => delSub.unsubscribe(),
    });
  }

  ngOnDestroy(): void {
    if (this.prodSubscription) {
      console.log('Dashboard unsubscribed...');
      this.prodSubscription?.unsubscribe();
    }
  }
}
