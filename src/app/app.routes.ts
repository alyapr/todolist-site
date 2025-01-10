import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
export const routes: Routes = [
  { path: 'todo-form', component: TodoFormComponent }, // Menambahkan route untuk RegisterComponent
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] }, // Menambahkan route untuk RegisterComponent
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, // Route untuk LoginComponent
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route mengarah ke login
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: NotFoundComponent },
];
