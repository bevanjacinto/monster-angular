import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatCardModule, MatButtonModule],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  //method to be triggered when login button is clicked
  googleLogin() {
    this.authService.googleLogin();
  }

  ngOnInit(): void {}
}
