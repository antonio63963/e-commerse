import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProductForm } from 'src/app/shared/interfaces';
import { FireBaseService } from 'src/app/shared/services/fire-base.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent {
  form?: FormGroup;

  constructor(private productService: ProductService, private router: Router, private fb: FireBaseService) {}

  getForm(form: FormGroup) {
    console.log(form)
    console.log('wowo')
    this.form = form;
  }
  
  onFormSubmit(productForm: IProductForm) {


    const product ={
      ...productForm,
      dateCreated: new Date()
    };
    this.fb.create(product).subscribe({
      next: (response) => {
        console.log("Add response: ", response);
        this.form?.reset();
        this.router.navigate(['/'])
      },
      error: (err: Error) => console.log('ERROR: ', err) 
    });
  }
}
