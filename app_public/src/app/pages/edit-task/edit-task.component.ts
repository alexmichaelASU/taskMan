import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListandTaskService } from '../../services/listand-task.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit{
  taskId: string | null = null; 
  taskTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listandTaskService: ListandTaskService
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('taskid');
  }

  onCreate(form: any): void {
    if (form.valid) {
        if (this.taskId) {
            // Update the existing list
            this.listandTaskService.updateTask(this.taskId, { title: this.taskTitle }).subscribe({
              next: () => {
                console.log(`List ${this.taskId} updated successfully.`);
                this.router.navigate(['/main']);
              },
              error: (error) => {
                console.error(`Error updating task ${this.taskId}:`, error);
              }
            });
        } 
    }
  }

  onCancel(): void {
    this.router.navigate(['/main']);
  }
}
