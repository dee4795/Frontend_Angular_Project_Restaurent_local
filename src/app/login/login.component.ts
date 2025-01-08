import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showLoginError: boolean = false; // To show login error pop-up
  showPassword: boolean = false; // To toggle password visibility

  constructor(private formbuilder: FormBuilder, private _http: HttpClient, private _router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  logIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Please fill all the required fields correctly before submitting');
      return;
    }

    this._http.get<any>('http://localhost:3000/signup').subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });

      if (user) {
        console.log('Login successful');
        // alert('Marvellous logged in successfully');
        this._router.navigate(['/restaurent']);
        this.loginForm.reset();
      } else {
        this.showLoginError = true;
        setTimeout(() => this.showLoginError = false, 3000); // Pop-up disappears after 3 seconds
      }
    }, err => {
      console.log(err);
      alert('Login Error');
    });
  }
}
