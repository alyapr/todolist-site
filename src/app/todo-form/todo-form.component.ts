import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model'; // Import model Category
import { CategoryResponse } from '../models/category-response.model'; // Import model CategoryResponse

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
      dueDate: [''],
      user: [this.userId], // Mengatur nilai userId secara otomatis
      category: [''], // Kategori tetap diperlukan
    });

    // Mendapatkan kategori dari API
    this.categoryService.getCategories().subscribe(
      (data: CategoryResponse) => {
        console.log('Categories received:', data); // Periksa data yang diterima
        this.categories = data.categories; // Menyimpan array kategori
      },
      (error) => {
        console.error('Error fetching categories:', error); // Tangani error jika ada
      }
    );
  }

  onSubmit(): void {
    // Mengecek apakah form valid
    console.log('Form Validity:', this.todoForm.valid);
    console.log('Form Value:', this.todoForm.value); // Menampilkan nilai form sebelum submit

    if (this.todoForm.valid) {
      // Ambil data form dan tambahkan userId secara eksplisit
      const todoData = { ...this.todoForm.value, user: this.userId };

      console.log('Form Data:', todoData); // Menampilkan nilai form yang sudah dilengkapi dengan userId

      // Mengirim data ke API menggunakan HttpClient POST request
      this.http.post('http://localhost:3000/todos', todoData).subscribe(
        (response) => {
          console.log('Todo berhasil disimpan:', response);
          // Lakukan aksi setelah berhasil menyimpan, seperti mengarahkan ke halaman lain atau membersihkan form
          this.todoForm.reset(); // Misalnya reset form
        },
        (error) => {
          console.error('Error saat menyimpan todo:', error);
          // Tampilkan error atau beri notifikasi
        }
      );
    }
  }
}
