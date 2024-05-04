import { Component, OnInit } from '@angular/core';
import { ListandTaskService } from '../../services/listand-task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiRequestsService } from '../../services/api-requests.service';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  lists: any[] = []; 
  tasks: any[] = []; 
  listId: string | null = null; 
  userName: string | null = null;
  userEmail: string | null = null;
  constructor(
    private listandTaskService: ListandTaskService,
    private router: Router,
    private apiReq: ApiRequestsService
  ) {}

  ngOnInit(): void {
    this.getAllLists();
    this.getTaskManName();
  }

  getAllLists(): void {
    this.userEmail = localStorage.getItem('email');
    if(this.userEmail) {
    this.listandTaskService.getAllListsByEmail(this.userEmail).subscribe({
      next: (lists) => {
        this.lists = lists;
      },
      error: (error) => {
        console.error('Error fetching lists:', error);
      },
      complete: () => {
        console.log('Fetched all lists.');
      }
    });
  } else {
    console.error('No email found in local storage');
    }
  }

  getTasksForList(listId: string): void {
    this.listandTaskService.getTasksForList(listId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks for list:', error);
      },
      complete: () => {
        console.log(`Fetched tasks for list ID ${listId}.`);
      }
    });
  }

  onListSelect(listId: string): void {
    this.listId = listId; 
    this.getTasksForList(listId);
  }

  onSettingsClick(listId: string): void {
    this.router.navigate([`/listedit/${listId}`]); 
  }

  onCreateClick(): void {
    this.router.navigate([`/listcreate`]); 
  }

  onTaskCreateClick(listId: string): void {
    this.router.navigate([`/taskcreate/${listId}`]); 
  }

  onTaskEditClick(taskId: string): void {
    this.router.navigate([`/taskedit/${taskId}`]); 
  }

  onDeleteTask(taskId: string): void {
    if (taskId) {
      this.listandTaskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log(`Task ${taskId} deleted successfully.`);
          
          if (this.listId !== null) {
            this.getTasksForList(this.listId);
          }
        },
        error: (error) => {
          console.error(`Error deleting task ${taskId}:`, error);
        }
      });
    }
}

onToggleTaskCompletion(task: any): void {
  
  task.completed = !task.completed;

  this.listandTaskService.toggleTaskCompletion(task._id, task.completed).subscribe({
    next: () => {
      console.log(`Task ${task._id} completion state updated to ${task.completed}.`);
    },
    error: (error) => {
      console.error(`Error updating task ${task._id}:`, error);
    }
  });
}

getTaskManName() {
  this.userEmail = localStorage.getItem('email');
  
  if (this.userEmail) {
      this.listandTaskService.getName(this.userEmail).subscribe({
          next: (response) => {
              this.userName = response.name;
          },
          error: (error) => {
              console.error('Error fetching user name:', error);
          }
      });
  } else {
      console.error('No email found in local storage');
  }
}


}
