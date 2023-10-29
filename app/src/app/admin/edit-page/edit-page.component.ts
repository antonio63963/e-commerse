import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, throwError } from 'rxjs';
import { IProduct, IProductForm } from 'src/app/shared/interfaces';
import { FireBaseService } from 'src/app/shared/services/fire-base.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  product?: IProduct;
  form?: FormGroup;
  errorMessage: string | null = null;

  t = 'some title';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FireBaseService
  ) {}

  ngOnInit(): void {
    const sub: Subscription = this.route.params
      .pipe(switchMap((params) => this.fb.getProductById(params['id'])))
      .subscribe({
        next: (res) => {
          // this.product = res;
          // this.t = 'oter';
        },
        error: (err) => console.log(err),
        complete: () => sub.unsubscribe(),
      });
  }

  isObjectsEqual(formData: any, srcData: any) {
    let isEqual = true;
    for (let key in formData) {
      if (formData[key] !== srcData[key]) isEqual = false;
    }
    return isEqual;
  }

  getForm(form: FormGroup) {
    this.form = form;
  }
  onFormSubmit(product: IProductForm) {
    // if (!this.isObjectsEqual(product, this.product)) {
    //   console.log('submit: ', product)
    //   const newProduct = {
    //     ...this.product?.dateCreated,
    //   };
    //   this.productService.update(newProduct).subscribe((res) => {
    //     this.router.navigate(['/admin', 'dashboard']);
    //   });
    // }else {
    //   this.errorMessage = 'The product is the same!'
    // }
  }
}
