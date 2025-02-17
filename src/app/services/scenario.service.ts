import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  private apiUrl = 'http://localhost:8080/api/v1/chat';
  constructor(private http: HttpClient) {}

  sendScenario(promptId: number, payload: any): Observable<any> {
    const url = `${this.apiUrl}/${promptId}/scenariogenerate`;
    return this.http.post(url, payload);
  }
  getScenarioList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/scenarioList`);
  }

}
