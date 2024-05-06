import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListandTaskService } from '../../services/listand-task.service';
@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  constructor(private router: Router, private listReq: ListandTaskService) {}

  onCancel(): void {
    this.router.navigate(['/main']);
  }

  deleteEverything() {
    const email = localStorage.getItem('email');
    if (email) {
        this.listReq.deleteListsByEmail(email).subscribe({
            next: () => {
                console.log('Successfully deleted all lists and tasks for email:', email);
                this.router.navigate(['/main']);
            },
            error: (error) => {
                console.error('Failed to delete lists and tasks:', error);
            }
        });
    } 
  }

}