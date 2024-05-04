import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestsService } from '../../services/api-requests.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private apiRequestsService: ApiRequestsService, private router: Router) {}
  
  login(form: NgForm) {
    if (form.valid) {
        const { email, password} = form.value;

        this.apiRequestsService.login({ email, password }).subscribe({
            next: (response: any) => {
                if ('error' in response) {
                    console.log(response.error);
                } else {
                    console.log('Login successful:', response);
                    localStorage.setItem(this.apiRequestsService.EMAIL_KEY, email);
                    localStorage.setItem(this.apiRequestsService.TOKEN_KEY, response.token);
                    this.apiRequestsService.user = response.user;
                    this.apiRequestsService.userListener.next(response.user);
                    this.router.navigate(['/main']);
                }
            },
            error: (error: any) => {
                console.error('Login failed:', error);
            }
        });
    } else {
        console.error('Form is invalid');
    }
}
}
