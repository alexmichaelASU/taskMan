import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListandTaskService } from '../../services/listand-task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listcreate',
  standalone: true,
  imports: [
    FormsModule,
    
  ],
  templateUrl: './listcreate.component.html',
  styleUrl: './listcreate.component.css'
})
export class ListcreateComponent {
  listTitle: string = ''; 
  userEmail: string | null = null;
  constructor(
    private router: Router,
    private listandTaskService: ListandTaskService 
  ) {}

  
  onCreate(form: any): void {
    this.userEmail = localStorage.getItem('email');
    let payload = {
      title: this.listTitle, 
      email: this.userEmail
  };
    if (form.valid) {
      this.listandTaskService.createList(payload).subscribe({
        next: () => {
          console.log('New list created successfully.');
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Error creating list:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/main']);
  }
}
