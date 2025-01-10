import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  userId: string | null = null;
  username: string | null = '';
  searchTerm: string = '';

  constructor(
    private todosService: TodosService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.userId = this.userService.getUserId();
      this.loadTodos();
      this.authService.username$.subscribe((name) => {
        this.username = name;
      });
    }
  }

  toggleEdit(todo: Todo): void {
    todo.isEditing = !todo.isEditing;
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

  loadTodos(): void {
    this.todosService.getTodos().subscribe(
      (response) => {
        this.todos = response.todos;
        this.filteredTodos = [...this.todos]; // Menyinkronkan filteredTodos dengan todos
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  deleteTodo(todo: Todo): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todosService.deleteTodo(todo._id).subscribe(
        () => {
          this.todos = this.todos.filter((t) => t._id !== todo._id);
        },
        (error) => {
          console.error('Error deleting todo:', error);
        }
      );
    }
  }

  filterTodos(): void {
    if (this.searchTerm.trim()) {
      // Filter todos berdasarkan judul atau deskripsi
      this.filteredTodos = this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Reset filteredTodos ke semua todos jika search term kosong
      this.filteredTodos = [...this.todos];
    }
  }

  addTodo(): void {
    this.router.navigate(['/todo-form']);
  }

  // Method to log out and clear userId from LocalStorage
  logout(): void {
    this.userService.logout(); // Call logout from UserService
    this.router.navigate(['/login']); // Redirect to login page
  }
}
