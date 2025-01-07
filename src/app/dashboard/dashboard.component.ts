import { Component, OnInit } from '@angular/core';
import { TodosService, Todo } from '../services/todos.service'; // Import TodosService
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Add the imports here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = []; // Menyimpan daftar todos

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(
      (response) => {
        console.log('Response:', response); // Lihat respon di console
        this.todos = response.todos; // Ambil array todos dari objek response
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  // Fungsi untuk memuat todos dari API
  loadTodos(): void {
    this.todosService.getTodos().subscribe((data) => {
      this.todos = Array.isArray(data) ? data : []; // Pastikan data adalah array
      console.log(this.todos); // Mengecek data todos yang diterima dari API
    });
  }
}
