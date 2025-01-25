import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://localhost:8080/api/v1/chat'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) {}

  // Appel pour envoyer les données et générer le scénario
  generateScenario(modelId: string, title: string, characters: any[], plot: string): Observable<any> {
    const url = `${this.baseUrl}/${modelId}/scenariogenerate`;
    
    // Construction du corps de la requête selon le DTO attendu par le backend
    const body = {
      titre: title, // Correspond à "titre" dans RequestDTO
      tramHistoire: plot, // Correspond à "tramHistoire" dans RequestDTO
      personnageDTOS: characters.map((character) => ({
        nomPersonnage: character.name, // Correspond à "nomPersonnage" dans PersonnageDTO
        traitsPersonnalite: character.trait, // Correspond à "traitsPersonnalite"
        description: character.appearance, // Correspond à "description"
      })),
    };

    return this.http.post(url, body);
  }
}
