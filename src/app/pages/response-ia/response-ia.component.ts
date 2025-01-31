import {Component, HostListener, OnInit} from '@angular/core';
import { MovieService } from '../../movie.service';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import {Subject} from 'rxjs';

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
  scenarioToDelete: any;
  selectedCharacter: any = null;
  selectedCharacterCopy: any = null;

  successMessage: string | null = null;
  private scenarioListUpdated = new Subject<void>(); // Subject pour notifier les changements

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadScenarioList();
    this.scenarioListUpdated.subscribe(() => {
      this.loadScenarioList();
    });
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
  loadScenarioDetails(scenarioId: number): void {
    this.isLoading = true;
    this.movieService.getScenarioDetails(scenarioId).subscribe({
      next: (data) => {
        this.selectedScenarioDetails = data;
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
  }
  closeDeleteConfirmation() {
    this.isDeleteConfirmationOpen = false;
    this.scenarioToDelete = null;

  }

  deleteScenario(): void {
    if (this.scenarioToDelete) {
      this.movieService.deleteScenario(this.scenarioToDelete).subscribe({
        next: (response) => {
          console.log('Scénario supprimé:', response);
          this.scenarioListUpdated.next();
          this.closeDeleteConfirmation();
        },
      error:(err)=>{
        console.error('Erreur lors de la suppression:', err);
        this.closeDeleteConfirmation();
      }
    });
    }

  }

  openCharacterModal(character: any) {
    this.selectedCharacter = character;
    this.isDeleteConfirmationOpen = false;
  }

  closeCharacterModal() {
    this.selectedCharacter = null;
  }


}
