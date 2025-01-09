import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model'; // Import model Category
import { CategoryResponse } from '../models/category-response.model'; // Import model CategoryResponse

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories'; // Ganti dengan URL API Anda

  constructor(private http: HttpClient) {}

  // Menggunakan CategoryResponse untuk mendefinisikan tipe data yang diterima
  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.apiUrl);
  }
}
