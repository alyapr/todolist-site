// todos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Todo } from '../models/todo.model'; // Mengimpor interface Todo
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiUrl = 'http://localhost:3000/todos'; // Endpoint API Node.js

  constructor(private http: HttpClient, private userService: UserService) {}

  // Fungsi untuk mendapatkan todos berdasarkan userId
  getTodosByUser(userId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching todos:', error);
        throw new Error('Failed to fetch todos');
      })
    );
  }

  // Fungsi untuk membuat todo baru
  createTodo(newTodo: Todo): Observable<Todo> {
    const userId = this.userService.getUserId(); // Ambil userId dari service
    if (userId) {
      return this.http.post<Todo>(this.apiUrl, { ...newTodo, userId });
    } else {
      throw new Error('User not logged in');
    }
  }

  // Fungsi untuk memperbarui todo
  updateTodo(id: string, updatedData: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, updatedData);
  }

  // Fungsi untuk menghapus todo
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
