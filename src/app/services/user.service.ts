import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userIdKey = 'user_id';

  constructor() {}

  // Menyimpan userId di localStorage
  saveUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  // Mengambil userId dari localStorage
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  // Menghapus userId dari localStorage saat logout
  logout(): void {
    localStorage.removeItem(this.userIdKey); // Menghapus userId
  }

  // Mengecek apakah user sudah login (apakah ada userId di localStorage)
  isLoggedIn(): boolean {
    return this.getUserId() !== null;
  }
}
