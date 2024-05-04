import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContentComponent } from './pages/content/content.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { ListcreateComponent } from './pages/listcreate/listcreate.component';
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { authGuard } from './auth.guard';
export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'main', component: ContentComponent, canActivate: [authGuard] },
    { path: 'listedit/:listid', component: EditListComponent, canActivate: [authGuard] },
    { path: 'listcreate', component: ListcreateComponent, canActivate: [authGuard] },
    { path: 'taskcreate/:listid', component: TaskCreateComponent, canActivate: [authGuard] },
    { path: 'taskedit/:taskid', component: EditTaskComponent, canActivate: [authGuard] }
];
