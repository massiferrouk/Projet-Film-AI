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
  scenarioToDelete: any;
  selectedCharacter: any = null;
  successMessage: string | null = null;

  isSidebarOpen = false;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadScenarioList();
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
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
      document.body.style.overflow = 'auto';
    }
  }
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

  openCharacterModal(character: any) {
    this.selectedCharacter = character;
    this.isDeleteConfirmationOpen = false;
  }

  closeCharacterModal() {
    this.selectedCharacter = null;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }
  

}