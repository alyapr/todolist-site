import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: string | null = null;

  constructor() {
    // Jika Anda menyimpan userId di localStorage saat login
    this.userId = localStorage.getItem('userId');
  }

  // Fungsi untuk menyimpan userId
  setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId); // Menyimpan ke localStorage
  }

  // Fungsi untuk mendapatkan userId
  getUserId(): string | null {
    return this.userId;
  }

  // Fungsi untuk mengecek apakah pengguna sudah login
  isLoggedIn(): boolean {
    return this.userId !== null;
  }
}
