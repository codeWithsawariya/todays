import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../dataservice/dataservice'; // Ensure this path is correct
import Swal from 'sweetalert2';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Add this import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  providers:[DataService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService, // This should work now
    private router: Router 
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required]] // Password validation
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.dataService.signIn(email, password).subscribe(
        (response: any) => {
          this.dataService.handleLoginResponse(response); // Store the token
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have logged in successfully!',
          }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.error.message || 'Invalid email or password',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Form Invalid',
        text: 'Please fill in all fields correctly.',
      });
    }
  }
  
  
}
