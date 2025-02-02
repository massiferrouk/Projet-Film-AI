import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService, Scenario } from '../../services/dataSenario.service';
 
@Component({
  selector: 'app-scenarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent implements OnInit {
  scenarios: Scenario[] = [];
  selectedScenarioIndex: number | null = null;
  showModal: boolean = false;
 
  constructor(private router: Router, private dataService: DataService) {}
 
  ngOnInit(): void {
    this.getScenarios();
  }
 
  getScenarios(): void {
    this.dataService.getData().subscribe(
      (response: Scenario[]) => {
        this.scenarios = response;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
 
  selectScenario(index: number) {
    this.selectedScenarioIndex = index;
  }
 
  goToNextPage() {
    if (this.selectedScenarioIndex !== null) {
      const scenarioId = this.scenarios[this.selectedScenarioIndex].id;
      this.router.navigate([`/scenariocreated2/${scenarioId}`]);
    } else {
      this.showModal = true; // Afficher le modal si aucun scénario n'est sélectionné
    }
  }

  closeModal() {
    this.showModal = false; // Fermer le modal
  }
 
  navigateToEditStyles() {
    this.router.navigate(['/edit-styles']);
  }
}