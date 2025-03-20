import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserInterface } from './interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  imports: [CommonModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  user: UserInterface = {
    id: 0,
    email: '',
    password: ''
  };
  message: string = '';

  ngOnInit(): void {
    this.me();
  }

  me() {
    this.authService.me().subscribe(response => {
      this.user = response;
    }, error => {
      this.message = error.message;
    })
  }


}
