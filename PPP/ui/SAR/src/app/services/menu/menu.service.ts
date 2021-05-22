import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/model/menu/menu';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${baseUrl}menu/`);
  }

  getMenu(id: String): Observable<Menu> {
    return this.http.get<Menu>(`${baseUrl}get_menu/${id}`);
  }

  createMenu(data: any): Observable<any> {
    return this.http.post(`${baseUrl}menu/`, data);
  }

  updateMenu(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}menu/${id}`, data);
  }

  deleteMenu(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}menu/${id}`);
  }
}
