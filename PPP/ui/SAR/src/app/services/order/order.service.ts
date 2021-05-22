import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order/order';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${baseUrl}order/`);
  }

  getOrder(id: String): Observable<Order> {
    return this.http.get<Order>(`${baseUrl}get_order/${id}`);
  }

  createOrder(data: any): Observable<any> {
    return this.http.post(`${baseUrl}order/`, data);
  }

  updateOrder(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}order/${id}`, data);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}order/${id}`);
  }

  stateOrder(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}state_order/${id}`, data);
  }
}
