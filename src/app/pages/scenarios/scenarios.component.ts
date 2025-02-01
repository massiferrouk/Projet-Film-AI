import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { DataService, Scenario } from '../../services/dataSenario.service';

@Component({
  selector: 'app-scenarios',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent implements OnInit {
  scenarios: Scenario[] = [];
  selectedScenarioIndex: number | null = null;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.getScenarios();
  }

  async getScenarios(): Promise<void> {
    try {
      const response = await this.dataService.getData();
      this.scenarios = response;
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  selectScenario(index: number) {
    this.selectedScenarioIndex = index;
  }

  goToNextPage() {
    if (this.selectedScenarioIndex !== null) {
      const scenarioId = this.scenarios[this.selectedScenarioIndex].id;
      this.router.navigate([`/scenariocreated/${scenarioId}`]);
    }
  }

  navigateToEditStyles() {
    this.router.navigate(['/edit-styles']);
  }
}
