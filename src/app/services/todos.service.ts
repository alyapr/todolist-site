import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  category: string;
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


  getTodos(): Observable<Todo[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<Todo[]>(this.apiUrl, { headers });
  }
}
