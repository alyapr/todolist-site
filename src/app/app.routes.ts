import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
  { path: 'register', component: RegisterComponent }, // Menambahkan route untuk RegisterComponent
  { path: 'login', component: LoginComponent }, // Route untuk LoginComponent
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route mengarah ke login
];
