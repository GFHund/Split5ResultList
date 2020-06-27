import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Split5ResultList';
  bLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.bLoggedIn = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/');
    });
  }
}
