// src/app/todo-form/todo-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model'; // Import model Category

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;
  categories: Category[] = []; // Gunakan tipe Category[] untuk kategori
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Mengambil userId dari UserService
    this.userId = this.userService.getUserId();

    // Inisialisasi form
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      completed: [false],
      dueDate: [''],
      user: [this.userId, Validators.required], // Mengatur nilai userId secara otomatis
      category: ['', Validators.required], // Kategori tetap diperlukan
    });

    // Mendapatkan kategori dari API
    this.categoryService.getCategories().subscribe(
      (data) => {
        console.log('Categories received:', data); // Periksa data yang diterima
        this.categories = data; // Menyimpan data kategori yang diterima
      },
      (error) => {
        console.error('Error fetching categories:', error); // Tangani error jika ada
      }
    );
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      console.log(this.todoForm.value);
      // Anda bisa mengirimkan data ke API di sini
      // this.http.post('your-api-url/todos', this.todoForm.value).subscribe(response => {
      //   console.log(response);
      // });
    }
  }
}
