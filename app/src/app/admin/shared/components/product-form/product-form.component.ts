import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { IProductForm } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, QuillModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @Output() onSubmit = new EventEmitter<IProductForm>();
  @Output() onForm = new EventEmitter<FormGroup>();
  @Input() submitButtonText?: string = 'Add';
  @Input() formTitle?: string = 'Add New Product';
  @Input() product?: IProductForm;

  submitted: boolean = false;
  form?: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(this.product?.type, [Validators.required]),
      title: new FormControl(this.product?.title, [
        Validators.required,
        Validators.minLength(3),
      ]),
      photo: new FormControl(this.product?.photo, [Validators.required]),
      info: new FormControl(this.product?.info, [
        Validators.required,
        Validators.minLength(10),
      ]),
      price: new FormControl(this.product?.price, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this.onForm.emit(this.form);
  }

  submit() {
    if (this.form?.invalid) return;
    this.submitted = true;

    const product = {
      type: this.form?.value.type,
      title: this.form?.value.title,
      photo: this.form?.value.photo,
      info: this.form?.value.info,
      price: this.form?.value.price,
    };
    this.onSubmit.emit(product);
  }
}
