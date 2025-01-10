import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
export const routes: Routes = [
  { path: 'todo-form', component: TodoFormComponent }, 
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: NotFoundComponent },
];
