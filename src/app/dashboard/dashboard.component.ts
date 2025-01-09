// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service'; // Impor TodosService
import { Todo, TodoResponse } from '../models/todo.model'; // Pastikan path ini benar
import { CommonModule } from '@angular/common'; // Impor CommonModule
import { FormsModule } from '@angular/forms'; // Impor FormsModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Menambahkan imports
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = []; // Menyimpan daftar todos

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    // Memuat todos saat komponen diinisialisasi
    this.todoService.getTodos().subscribe(
      (response: TodoResponse) => {
        this.todos = response.todos.map((todo) => ({
          ...todo,
          isEditing: false,
        }));
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  toggleEdit(todo: Todo): void {
    todo.isEditing = !todo.isEditing; // Mengubah status edit
  }

  saveChanges(todo: Todo): void {
    const { user, category, isEditing, ...dataToSend } = todo;

    this.todoService.updateTodo(todo._id, dataToSend).subscribe(
      (updatedTodo) => {
        todo.isEditing = false;
        Object.assign(todo, updatedTodo); // Update todo dengan hasil dari server
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  cancelEdit(todo: Todo): void {
    todo.isEditing = false;
  }

  // Fungsi untuk menghapus todo
  deleteTodo(todo: Todo): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(todo._id).subscribe(
        () => {
          // Menghapus todo dari daftar setelah dihapus
          this.todos = this.todos.filter((t) => t._id !== todo._id);
        },
        (error) => {
          console.error('Error deleting todo:', error);
        }
      );
    }
  }
}
