import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { TodoResponse } from '../models/todo.model';
import { UserService } from '../services/user.service';
export interface User {
  username: string;
  email: string;
}
export interface Category {
  name: string;
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  user: User;
  category: string;
  isEditing?: boolean;
}
export interface TodosResponse {
  message: string;
  todos: Todo[]; // todos adalah array yang berisi objek Todo
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiUrl = 'http://localhost:3000/todos'; // Endpoint API Node.js

  constructor(private http: HttpClient) {}

  // getTodos(): Observable<Todo[]> {
  //   const headers = { 'Cache-Control': 'no-cache' };
  //   return this.http.get<Todo[]>(this.apiUrl, { headers });
  // }
  // Fungsi untuk mendapatkan todos berdasarkan userId
  getTodosByUser(): Observable<Todo[]> {
    const userId = this.userService.getUserId(); // Ambil userId dari UserService
    if (userId) {
      return this.http.get<Todo[]>(`${this.apiUrl}?userId=${userId}`); // Sesuaikan dengan endpoint API Anda
    } else {
      throw new Error('User not logged in');
    }
  }
  createTodo(newTodo: Todo): Observable<Todo> {
    const userId = this.userService.getUserId();
    if (userId) {
      // Menambahkan userId ke dalam objek user
      newTodo.user = {
        username: 'exampleUsername',
        email: 'example@example.com',
      }; // Sesuaikan dengan data user yang ada
      return this.http.post<Todo>(this.apiUrl, newTodo);
    } else {
      throw new Error('User not logged in');
    }
  }

  // getTodos(): Observable<TodoResponse> {
  //   return this.http.get<TodoResponse>(this.apiUrl);
  // }

  updateTodo(id: string, updatedData: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, updatedData);
  }
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
