import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];
  userId: string | null = null;

  constructor(
    private todosService: TodosService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.userId = this.userService.getUserId();
      this.loadTodos();
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

  // Method to log out and clear userId from LocalStorage
  logout(): void {
    this.userService.logout(); // Call logout from UserService
    this.router.navigate(['/login']); // Redirect to login page
  }
}
