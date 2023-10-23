import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces';
import { Observable, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  products$?: Observable<IProduct[]>;

  constructor(private prodServ: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.prodServ.getAll()
    // .subscribe((res) => {
    //   console.log('GET: ', res);
    //   this.products$ = res;
    // });
  }
}
