import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Remote } from "../models/Remote";

interface CreateRemoteDto {
  type: string;
  Date: Date;
  UserId:string;
}

interface UpdateRemoteDto {
  type: string;
  Date: Date;
  UserId:string;

}

@Injectable({ providedIn: "root" })
export class RemoteService {
  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createRemote(createRemoteDto: CreateRemoteDto) {
    return this.http.post(`${this.backendUrl}/api/worktype`, createRemoteDto);
  }

  getRemotes(): Observable<Remote[]> {
    return this.http.get<Remote[]>(`${this.backendUrl}/api/worktype`);
  }

  getRemoteById(id: number): Observable<Remote> {
    return this.http.get<Remote>(`${this.backendUrl}/api/worktype/${id}`);
  }

  editRemote(id: number, updateRemoteDto: UpdateRemoteDto) {
    return this.http.put(`${this.backendUrl}/api/worktype/${id}`, updateRemoteDto);
  }

  deleteRemote(id: number) {
    return this.http.delete(`${this.backendUrl}/api/worktype/${id}`);
  }
}
