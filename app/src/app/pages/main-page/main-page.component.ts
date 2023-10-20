import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces';
import { map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  products$?: IProduct[];

  constructor(private prodServ: ProductService) {}

  ngOnInit(): void {
    this.prodServ.getAll().subscribe((res) => {
      console.log('GET: ', res);
      this.products$ = res;
    });
  }
}
