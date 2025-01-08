import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showNamePopup: boolean = false;
  showEmailPopup: boolean = false;
  showMobilePopup: boolean = false;
  showPasswordPopup: boolean = false;
  showPassword: boolean = false; // To toggle password visibility

  constructor(private formbuilder: FormBuilder, private _http: HttpClient, private _router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[/ @#$%^&+=]).{8,}$')]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signUp() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      
      if (!this.signupForm.controls['name'].valid) {
        this.showNamePopup = true;
        setTimeout(() => this.showNamePopup = false, 5000); // Pop-up disappears after 3 seconds
      }

      if (!this.signupForm.controls['email'].valid) {
        this.showEmailPopup = true;
        setTimeout(() => this.showEmailPopup = false, 5000); // Pop-up disappears after 3 seconds
      }

      if (!this.signupForm.controls['mobile'].valid) {
        this.showMobilePopup = true;
        setTimeout(() => this.showMobilePopup = false, 5000); // Pop-up disappears after 3 seconds
      }

      if (!this.signupForm.controls['password'].valid) {
        this.showPasswordPopup = true;
        setTimeout(() => this.showPasswordPopup = false, 8000); // Pop-up disappears after 3 seconds
      }

      alert('Please fill all the required fields correctly before submitting');
      return;
    }

    this._http.post<any>('http://localhost:3000/signup', this.signupForm.value).subscribe(res => {
      console.log(res);
      alert('Signup Successfully');
      this.signupForm.reset();
      this._router.navigate(['/login']);
    }, err => {
      console.log(err);
      alert('Signup Error');
    });
  }
}
