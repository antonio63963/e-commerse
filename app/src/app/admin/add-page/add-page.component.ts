import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  submitted: boolean = false;
  form?: FormGroup;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      photo: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }
  submit() {
    if(this.form?.invalid) return;

    const product ={
      type: this.form?.value.type,
      title: this.form?.value.title,
      photo: this.form?.value.photo,
      info: this.form?.value.info,
      price: this.form?.value.price,
      dateCreated: new Date()
    };
    this.productService.create(product).subscribe({
      next: (response) => {
        console.log("Add response: ", response);
        this.form?.reset();
        this.router.navigate(['/'])
      }
    });
  }
}
