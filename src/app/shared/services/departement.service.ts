import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Departement } from "../models/Departement";

interface CreateDepartementDto {
  name: string;
  
}

@Injectable({ providedIn: "root" })
export class Departementservice {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createDepartement(createDepartementDto: CreateDepartementDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.backendUrl}/api/departement`,
      createDepartementDto
    );
  }

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.backendUrl}/api/departement`);
  }

  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.backendUrl}/api/departement/${id}`);
  }

  editDepartement(
    id: number,
    updateDepartementDto: CreateDepartementDto
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.backendUrl}/api/departement/${id}`,
      updateDepartementDto
    );
  }

  deleteDepartement(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.backendUrl}/api/departement/${id}`
    );
  }
}
