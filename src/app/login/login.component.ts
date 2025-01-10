import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Gunakan AuthService
  ) {
    // Membuat form grup dengan validasi
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Panggil AuthService untuk login
      this.authService.login(email, password).subscribe(
        (response: any) => {
          const { userId, username } = response; // Ambil username dari respons
  
          // Simpan userId dan username setelah login berhasil
          this.authService.saveUserId(userId, username);
  
          console.log('Login successful');
          // Navigasi ke halaman dashboard
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error logging in:', error);
          // Tampilkan pesan kesalahan di UI jika diperlukan
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    }
  }
}
