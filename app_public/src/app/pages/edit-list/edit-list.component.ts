import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListandTaskService } from '../../services/listand-task.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  listId: string | null = null; 
  listTitle: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listandTaskService: ListandTaskService
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('listid');
    
    
    
  }

  onCreate(form: any): void {
    if (form.valid) {
        if (this.listId) {
            // Update the existing list
            this.listandTaskService.updateList(this.listId, { title: this.listTitle }).subscribe({
              next: () => {
                console.log(`List ${this.listId} updated successfully.`);
                // Redirect to /main
                this.router.navigate(['/main']);
              },
              error: (error) => {
                console.error(`Error updating list ${this.listId}:`, error);
              }
            });
        } 
        
    }
  }

  // Handle deletion of the list
  onDelete(): void {
    if (this.listId) {
        this.listandTaskService.deleteList(this.listId).subscribe({
          next: () => {
            console.log(`List ${this.listId} deleted successfully.`);
            this.router.navigate(['/main']);
          },
          error: (error) => {
            console.error(`Error deleting list ${this.listId}:`, error);
          }
        });
    }
  }

  
  onCancel(): void {
    this.router.navigate(['/main']);
  }
}
