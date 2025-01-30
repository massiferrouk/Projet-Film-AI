import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service'; // Assurez-vous d'importer le bon service
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-response-ia',
  templateUrl: './response-ia.component.html',
  styleUrls: ['./response-ia.component.css'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class ResponseIaComponent implements OnInit {
  discussions: { titre: string; scenario: string }[] = [];
  selectedDiscussionIndex: number | null = null;
  isLoading = false;


  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const navigation = history.state;
    if (!navigation) {
      console.error("Données manquantes pour le scénario !");
    } else {
      this.discussions = [{
        titre: navigation.titre,
        scenario: navigation.scenario
      }];
    }
    this.loadScenarioList();
  }

  loadScenarioList(): void {

    this.movieService.getScenarioList().subscribe({
      next: (data) => {
        const limitedData = data.slice(0, 3); // Récupère les trois premiers scénarios
        this.discussions = limitedData.map((item: any, index: number) => ({
          titre: `Discussion ${index + 1}`, // Titre dynamique
          scenario: item.scenario,
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des scénarios :', err);
      },
    });
  }


  selectDiscussion(index: number): void {
    this.selectedDiscussionIndex = index;
  }
  generateNewScenario() {
    this.router.navigate(['/scenarios']);
  }
}
