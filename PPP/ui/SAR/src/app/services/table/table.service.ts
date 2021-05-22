import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from 'src/app/model/table/table';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${baseUrl}table/`);
  }

  getTable(id: String): Observable<Table> {
    return this.http.get<Table>(`${baseUrl}get_table/${id}`);
  }

  createTable(data: any): Observable<any> {
    return this.http.post(`${baseUrl}table/`, data);
  }

  updateTable(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}table/${id}`, data);
  }

  deleteTable(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}table/${id}`);
  }
}
