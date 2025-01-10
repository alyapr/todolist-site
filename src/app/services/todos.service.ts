import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { TodoResponse } from '../models/todo.model';
import { UserService } from './user.service';
import { environment } from '../environments/environment';
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
  dueDate: Date;
  user: User;
  category: string;
  isEditing?: boolean;
}
export interface TodosResponse {
  message: string;
  todos: Todo[];
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  getTodos(): Observable<TodoResponse> {
    const userId = this.userService.getUserId();
    return this.http.get<TodoResponse>(`${this.apiUrl}/todos?userId=${userId}`);
  }

  updateTodo(id: string, updatedData: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todos/${id}`, updatedData);
  }
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todos/${id}`);
  }
}
