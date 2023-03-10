import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponse, Credentials } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginForm.value as Credentials)
    .subscribe(
      async (res: AuthResponse) => {
        const { token, message } = res;
        alert(message);
        localStorage.setItem('token', token);
        try {
          const user = await this.authService.getUser();
          localStorage.setItem('user', JSON.stringify(user));
        } catch (e) { console.log(e) }
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        alert('Error: ' + err.error.message);
      }
    );
  }

}
