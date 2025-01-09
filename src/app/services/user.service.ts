// services/user.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userIdKey = 'userId'; // Key untuk menyimpan userId

  // Fungsi untuk menyimpan userId ke localStorage
  saveUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  // Fungsi untuk mendapatkan userId dari localStorage
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  // Fungsi untuk menghapus userId dari localStorage
  clearUserId(): void {
    localStorage.removeItem(this.userIdKey);
  }
}
