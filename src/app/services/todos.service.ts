import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { TodoResponse } from '../models/todo.model';
import { UserService } from './user.service';
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

  constructor(private http: HttpClient, private userService: UserService) {}

  // getTodos(): Observable<Todo[]> {
  //   const headers = { 'Cache-Control': 'no-cache' };
  //   return this.http.get<Todo[]>(this.apiUrl, { headers });
  // }
  getTodos(): Observable<TodoResponse> {
    const userId = this.userService.getUserId(); // Mendapatkan userId dari service
    return this.http.get<TodoResponse>(`${this.apiUrl}?userId=${userId}`);
  }

  updateTodo(id: string, updatedData: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, updatedData);
  }
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
