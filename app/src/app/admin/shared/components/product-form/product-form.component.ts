import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { IProductForm, ImageInputEvent } from 'src/app/shared/interfaces';

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
  @Input() errorMessage: string | null = null;

  submitted: boolean = false;
  form?: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;
  multiImg: any[] = [];

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(this.product?.type, [Validators.required]),
      title: new FormControl(this.product?.title, [
        Validators.required,
        Validators.minLength(3),
      ]),
      photo: new FormControl([], [Validators.required]),
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

  showPhoto(event: ImageInputEvent) {
    console.log(event);
    const files = event.target.files;
    if (event.target?.files && event.target?.files[0]) {
      // const file = event.target.files[0];

      // const reader = new FileReader();
      // reader.onload = (e) => (this.imageSrc = reader.result);

      // reader.readAsDataURL(file);

      const numberOfFiles = files.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.multiImg.push(e.target.result);
        };

        reader.readAsDataURL(files[i]);
      }
    }
  }

  submit() {
    if (this.form?.invalid) return;
    this.submitted = true;

    const product = {
      type: this.form?.value.type,
      title: this.form?.value.title,
      // photo: this.form?.value.photo,
      photo: this.multiImg,
      info: this.form?.value.info,
      price: this.form?.value.price,
    };
    this.onSubmit.emit(product);
  }
}
