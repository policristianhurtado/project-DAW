import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet,PetType } from '../model/pet';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  constructor(private http: HttpClient) { }


  // PetType Services
  getAllPetType(): Observable<PetType[]> {
    return this.http.get<PetType[]>(`${baseUrl}pet_type/`);
  }

  getPetType(id: String): Observable<Pet> {
    return this.http.get<Pet>(`${baseUrl}get_pet_type/${id}`);
  }

  // Pet Services
  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${baseUrl}pet/`);
  }

  getPet(id: String): Observable<Pet> {
    return this.http.get<Pet>(`${baseUrl}get_pet/${id}`);
  }

  createPet(data: any): Observable<any> {
    return this.http.post(`${baseUrl}pet/`, data);
  }

  updatePet(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}pet/${id}`, data);
  }

  deletePet(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}pet/${id}`);
  }

}


