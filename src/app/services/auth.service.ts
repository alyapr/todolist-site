// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment'; // URL API di environment

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL backend API
  private userIdKey = 'user_id'; // Key untuk menyimpan userId di LocalStorage

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Login untuk mendapatkan userId
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Fungsi untuk menyimpan userId ke LocalStorage
  saveUserId(userId: string, username: string): void {
    localStorage.setItem(this.userIdKey, userId);
    this.usernameSubject.next(username); // Emit perubahan username
  }

  // Fungsi untuk mengambil userId dari LocalStorage
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  // Fungsi untuk menghapus userId
  logout(): void {
    localStorage.removeItem(this.userIdKey);
  }
}
