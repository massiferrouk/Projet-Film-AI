import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Scenario } from '../../services/dataSenario.service';

@Component({
  selector: 'app-edit-styles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-styles.component.html',
  styleUrls: ['./edit-styles.component.css'],
})
export class EditStylesComponent implements OnInit {
  scenarios: Scenario[] = [];
  showEditModal = false;
  showCreateModal = false;
  showDeleteModal = false

  editedScenarioIndex: number | null = null;
  editedScenarioTitle: string = '';
  editedScenarioDescription: string = '';

  newScenarioTitle: string = '';
  newScenarioDescription: string = '';
  newScenarioImg: string | null = null;

  scenarioToDeleteIndex: number | null = null

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



deleteScenario(index: number) {
  this.scenarioToDeleteIndex = index;
  this.showDeleteModal = true;
}


async confirmDelete(): Promise<void> {
  if (this.scenarioToDeleteIndex !== null) {
    try {
      const scenarioId = this.scenarios[this.scenarioToDeleteIndex].id;
      await this.dataService.deleteData(scenarioId);
      this.scenarios.splice(this.scenarioToDeleteIndex, 1);
    } catch (error) {
      console.error('Error deleting data', error);
    }
  }
  this.cancelDelete();
}

cancelDelete() {
  this.scenarioToDeleteIndex = null;
  this.showDeleteModal = false;
}
/*
  async deleteScenario(index: number): Promise<void> {
    try {
      const scenarioId = this.scenarios[index].id;
      await this.dataService.deleteData(scenarioId);
      this.scenarios.splice(index, 1);
    } catch (error) {
      console.error('Error deleting data', error);
    }
  }*/

  openEditModal(index: number) {
    this.editedScenarioIndex = index;
    this.editedScenarioTitle = this.scenarios[index].titre;
    this.editedScenarioDescription = this.scenarios[index].description;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editedScenarioIndex = null;
    this.editedScenarioTitle = '';
    this.editedScenarioDescription = '';
  }

  saveEdit() {
    if (this.editedScenarioIndex !== null) {
      const updatedScenario = this.scenarios[this.editedScenarioIndex];
      updatedScenario.titre = this.editedScenarioTitle;
      updatedScenario.description = this.editedScenarioDescription;
      // Update the scenario in the service or send an update request to the API here
    }
    this.closeEditModal();
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.newScenarioTitle = '';
    this.newScenarioDescription = '';
    this.newScenarioImg = null;
  }

  saveCreate() {
    if (
      this.newScenarioTitle &&
      this.newScenarioImg &&
      this.newScenarioDescription
    ) {
      // Save the new scenario in the service or send a create request to the API here
      this.scenarios.push({
        id: this.scenarios.length + 1, // Temporary ID, replace with the one from the API if needed
        titre: this.newScenarioTitle,
        description: this.newScenarioDescription,
        imgUrl: this.newScenarioImg,
      });
    }
    this.closeCreateModal();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newScenarioImg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.router.navigate(['/scenarios']);
  }
}
