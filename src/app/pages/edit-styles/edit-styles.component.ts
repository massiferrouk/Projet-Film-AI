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
  showDeleteModal = false;
 
  editedScenarioIndex: number | null = null;
  editedScenarioTitle: string = '';
  editedScenarioDescription: string = '';
 
  newScenarioTitle: string = '';
  newScenarioDescription: string = '';
  newScenarioImg: string | null = null;
  newScenarioFileName: string | null = null;
 
  scenarioToDeleteIndex: number | null = null;
 
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
 
  async saveEdit() {
    if (this.editedScenarioIndex !== null) {
      const updatedScenario: Scenario = {
        id: this.scenarios[this.editedScenarioIndex].id,
        titre: this.editedScenarioTitle,
        description: this.editedScenarioDescription,
        imgUrl: this.scenarios[this.editedScenarioIndex].imgUrl,
      };
 
      try {
        await this.dataService.updateData(updatedScenario.id, updatedScenario);
        this.scenarios[this.editedScenarioIndex] = updatedScenario;
      } catch (error) {
        console.error('Error updating data', error);
      }
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
    this.newScenarioFileName = null;
  }
 
  async saveCreate() {
    if (
      this.newScenarioTitle &&
      this.newScenarioFileName &&
      this.newScenarioDescription
    ) {
      const newScenario: Scenario = {
        id: 0, // This will be ignored by the backend, replace with the actual ID if necessary
        titre: this.newScenarioTitle,
        description: this.newScenarioDescription,
        imgUrl: this.newScenarioFileName,
      };
 
      try {
        this.scenarios = await this.dataService.createData(newScenario);
      } catch (error) {
        console.error('Error creating data', error);
      }
    }
    this.closeCreateModal();
  }
 
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imgDataUrl = e.target.result;
        this.newScenarioImg = imgDataUrl;
        this.newScenarioFileName = file.name;
        if (this.newScenarioFileName) {
          // Sauvegarder l'image dans le répertoire public
          this.saveImageToPublic(imgDataUrl, this.newScenarioFileName);
        }
      };
      reader.readAsDataURL(file);
    }
  }
 
  saveImageToPublic(dataUrl: string, fileName: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
 
  goBack() {
    this.router.navigate(['/scenarios']);
  }
}
 