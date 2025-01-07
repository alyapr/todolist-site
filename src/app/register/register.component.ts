// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Tambahkan dependensi ini
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true, // Menandakan komponen ini adalah standalone
  // templateUrl: './register.component.html',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule], // Masukkan ReactiveFormsModule sebagai import
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted', this.registerForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
