import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListandTaskService } from '../../services/listand-task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [FormsModule], // Import FormsModule
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  listId: string | null = null; 
  taskTitle: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listandTaskService: ListandTaskService
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('listid');
  }

  onCreate(form: any): void {
    if (form.valid && this.listId) {
      this.listandTaskService.createTask(this.listId, this.taskTitle).subscribe({
        next: () => {
          console.log(`New task created in list ${this.listId} successfully.`);
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/main']);
  }
}
