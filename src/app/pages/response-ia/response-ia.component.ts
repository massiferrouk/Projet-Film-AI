import {Component, HostListener, OnInit} from '@angular/core';
import { MovieService } from '../../movie.service';
import { Router } from '@angular/router';
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
  discussions: { titre: string; id: number }[] = [];
  selectedDiscussionIndex: number | null = null;
  isLoading = false;
  selectedScenarioDetails: any = null;
  isDeleteConfirmationOpen = false;
  scenarioToDelete: any; // Stocke l'ID du scénario à supprimer
  selectedCharacter: any = null; // Personnage sélectionné pour voir les détails
  successMessage: string | null = null;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadScenarioList();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.isDeleteConfirmationOpen) {
      this.closeDeleteConfirmation();
    }
  }

  loadScenarioList(): void {
    this.movieService.getScenarioList().subscribe({
      next: (data) => {
        this.discussions = data.map((item: any) => ({
          titre:  item.titre,
          id: item.id,
        }));

        if (this.discussions.length > 0) {
          this.selectedDiscussionIndex = this.discussions.length - 1;
          this.loadScenarioDetails(this.discussions[this.selectedDiscussionIndex].id);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des scénarios :', err);
      },
    });
  }

  selectDiscussion(index: number): void {
    this.selectedDiscussionIndex = index;
    this.loadScenarioDetails(this.discussions[index].id);
  }
  // Méthode pour récupérer les détails du scénario sélectionné
  loadScenarioDetails(scenarioId: number): void {
    this.isLoading = true;
    this.movieService.getScenarioDetails(scenarioId).subscribe({
      next: (data) => {
        console.log("je recois ainsi la reponse",data);
        this.selectedScenarioDetails = data;
        console.log("le data ressemble a ca ",this.selectedScenarioDetails);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails du scénario :', err);
        this.isLoading = false;
      },
    });
  }
  generateNewScenario() {
    this.router.navigate(['/scenarios']);
  }
  openDeleteConfirmation(scenarioId: number) {
    this.scenarioToDelete = scenarioId;
    this.isDeleteConfirmationOpen = true;
    this.closeCharacterModal();
  }
  // Fermer le pop-up sans effectuer de suppression
  closeDeleteConfirmation() {
    this.isDeleteConfirmationOpen = false;
    this.scenarioToDelete = null;
  }

  deleteScenario(): void {
    if (this.scenarioToDelete) {
      this.movieService.deleteScenario(this.scenarioToDelete).subscribe({
        next: (response) => {
          console.log('Scénario supprimé:', response);

          this.discussions = this.discussions.filter(discussion => discussion.id !== this.scenarioToDelete);
          this.closeDeleteConfirmation();
        },
      error:(err)=>{
        console.error('Erreur lors de la suppression:', err);
        this.closeDeleteConfirmation();
      }
    });
    }

  }
  // Supprimer un personnage
  deleteCharacter(): void {
    if (this.selectedCharacter) {
      this.movieService.deleteCharacter(this.selectedCharacter.id).subscribe({
        next: (response) => {
          this.selectedScenarioDetails.b = this.selectedScenarioDetails.b.filter((p: {
            id: any;
          }) => p.id !== this.selectedCharacter.id);
          this.successMessage = response;

          this.router.navigateByUrl('/response-ia', { skipLocationChange: true }).then(() => {
            this.router.navigate([`/response-ia`]);
          });

          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          this.closeDeleteConfirmation();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.closeDeleteConfirmation();
        },
      });
    }
  }
  // Ouvrir le modal de personnage
  openCharacterModal(character: any) {
    this.selectedCharacter = character;
    this.isDeleteConfirmationOpen = false;
  }

  closeCharacterModal() {
    this.selectedCharacter = null;
  }


}
