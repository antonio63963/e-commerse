import { Component, DoCheck, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements DoCheck {

  @Input() product?: IProduct;

  ngDoCheck() {
    // console.log('prod:', this.product?.id)
  } 

}
