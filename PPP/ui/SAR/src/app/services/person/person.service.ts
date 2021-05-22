import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/app/model/person/person';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${baseUrl}person/`);
  }

  getPerson(id: String): Observable<Person> {
    return this.http.get<Person>(`${baseUrl}get_person/${id}`);
  }

  createPerson(data: any): Observable<any> {
    return this.http.post(`${baseUrl}person/`, data);
  }

  updatePerson(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}person/${id}`, data);
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}person/${id}`);
  }
}
