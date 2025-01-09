import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service'; // Import TodosService
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add the imports here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = []; // Menyimpan daftar todos

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(
      (response) => {
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

    this.todosService
      .updateTodo(todo._id, {
        ...dataToSend,
      })
      .subscribe(
        (updatedTodo) => {
          todo.isEditing = false;
          Object.assign(todo, updatedTodo);
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
  }

  cancelEdit(todo: Todo): void {
    todo.isEditing = false;
  }

  // Fungsi untuk memuat todos dari API
  loadTodos(): void {
    this.todosService.getTodos().subscribe((data) => {
      this.todos = Array.isArray(data) ? data : []; // Pastikan data adalah array
      console.log(this.todos); // Mengecek data todos yang diterima dari API
    });
  }
  deleteTodo(todo: Todo): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todosService.deleteTodo(todo._id).subscribe(
        () => {
          // Remove the deleted todo from the list
          this.todos = this.todos.filter((t) => t._id !== todo._id);
        },
        (error) => {
          console.error('Error deleting todo:', error);
        }
      );
    }
  }
}
