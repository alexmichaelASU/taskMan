import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ListandTaskService } from '../../services/listand-task.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private listAndTaskService: ListandTaskService, private router: Router) {}

  register(form: NgForm) {
    
    if (form.valid) {
      const { name, email, password } = form.value;

      this.listAndTaskService.register(name, email, password).subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);

          this.router.navigate(['/login']); 
        },
        error: (error: any) => {
          
          console.error('Registration failed:', error);
        },
        complete: () => {
          console.log('Subscription completed');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
}
