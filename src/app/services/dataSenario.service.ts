import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
 
export interface Scenario {
  id: number;
  titre: string;
  description: string;
  imgUrl: string;
}
 
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'http://127.0.0.1:8080/api/v1/chat/promptmodels';
 
  constructor(private http: HttpClient) {}
 
  getData(): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(this.apiURL);
  }
 
  async deleteData(id: number): Promise<void> {
    await axios.delete(`http://127.0.0.1:8080/api/v1/chat/delete`, {
      data: { id },
    });
  }
 
  async updateData(id: number, updatedScenario: Scenario): Promise<void> {
    await axios.put(
      `http://127.0.0.1:8080/api/v1/chat/update/${id}`,
      updatedScenario
    );
  }
 
  async createData(newScenario: Scenario): Promise<Scenario[]> {
    const response = await axios.post<Scenario[]>(
      `http://127.0.0.1:8080/api/v1/chat/promptcreate`,
      newScenario
    );
    return response.data;
  }
}