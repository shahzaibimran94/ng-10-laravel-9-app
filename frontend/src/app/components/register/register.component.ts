import { Component, OnInit } from '@angular/core';
import { AuthService, RegisterFormData, AuthResponse } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.registerForm.value as RegisterFormData)
    .subscribe(
      (res: AuthResponse) => {
        const { token, message } = res;
        alert(message);
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        alert('Error: ' + err.error.message);
      }
    )
  }

}
