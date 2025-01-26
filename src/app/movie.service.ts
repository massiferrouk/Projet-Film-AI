import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'http://localhost:8080/api/v1/chat';

  constructor(private http: HttpClient) {}

  generateScenario(modelId: number | null, title: string, characters: any[], plot: string): Observable<any> {
    const url = `${this.baseUrl}/${modelId}/scenariogenerate`;
    const body = {
      personnageDTOS: characters.map((character) => ({
        nomPersonnage: character.nomPersonnage,
        traitsPersonnalite: character.traitsPersonnalite,
        description: character.description,
      })),
      tramHistoire: plot,
      titre: title,
    };
    console.log(body);
    return this.http.post(url, body,{ responseType: 'text' });
  }

  getScenarioList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/scenarioList`);
  }
}
