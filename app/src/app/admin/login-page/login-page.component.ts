import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FireBaseService } from 'src/app/shared/services/fire-base.service';

interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form?: FormGroup;
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    console.log('pass: ', this.form.controls['email'])
  }

  submit() {
    if(this.form?.invalid) return;
    this.submitted = true;

    const user: User = {
      email: this.form?.value.email,
      password: this.form?.value.password,
      returnSecureToken: true
    };
    this.auth.login(user).subscribe({
     next: (resp) => {
      console.log(resp);
      this.form?.reset();
      this.router.navigate(['/admin', 'dashboard'])
     },
     error: (err) => {
      this.submitted = false;
     },
    //  complete: () => {}
    });
  }

}
