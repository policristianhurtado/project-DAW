import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from 'src/app/model/menu/section/section';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  getAllSections(): Observable<Section[]> {
    return this.http.get<Section[]>(`${baseUrl}section/`);
  }

  getSection(id: String): Observable<Section> {
    return this.http.get<Section>(`${baseUrl}get_section/${id}`);
  }

  createSection(data: any): Observable<any> {
    return this.http.post(`${baseUrl}section/`, data);
  }

  updateSection(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}section/${id}`, data);
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}section/${id}`);
  }
}
