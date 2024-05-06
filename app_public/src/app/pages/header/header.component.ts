import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiRequestsService } from '../../services/api-requests.service';
import { Router } from '@angular/router';
import { ListandTaskService } from '../../services/listand-task.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
	RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private apiReq: ApiRequestsService, private router: Router, private listReq: ListandTaskService) {}

  logout() {
    this.apiReq.logout();
  }

 reDirect() {
  this.router.navigate(['/delete']);
 }
}