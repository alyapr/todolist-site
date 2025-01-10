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
import { CategoryResponse } from '../models/category-response.model'; // Import model CategoryResponse
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoFormComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  todoForm!: FormGroup;
  categories: Category[] = [];
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();

    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      dueDate: [''],
      user: [this.userId],
      category: [''],
    });

    this.categoryService.getCategories().subscribe(
      (data: CategoryResponse) => {
        console.log('Categories received:', data);
        this.categories = data.categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Form Validity:', this.todoForm.valid);
    console.log('Form Value:', this.todoForm.value);

    if (this.todoForm.valid) {
      const todoData = { ...this.todoForm.value, user: this.userId };

      console.log('Form Data:', todoData);

      this.http.post(`${this.apiUrl}/todos`, todoData).subscribe(
        (response) => {
          console.log('Todo berhasil disimpan:', response);

          this.todoForm.reset();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error saat menyimpan todo:', error);
        }
      );
    }
  }
}
