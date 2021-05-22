import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}product/`);
  }

  getProduct(id: String): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}get_product/${id}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${baseUrl}product/`, data);
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}product/${id}`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}product/${id}`);
  }
}
