import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'frontend';
  loggedIn = false;
  userName = '';
  private subscription: any;
  constructor(private authService: AuthService, private router: Router) {
    this.subscription = router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.loggedIn = this.authService.isTokenValid();
        const user = localStorage.getItem('user');
        if (user) {
          const data = JSON.parse(user);
          this.userName = data.name??'';
        }
      }
    })
  }

  async logout() {
    try {
      await this.authService.logout();
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
