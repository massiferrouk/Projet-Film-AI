import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scenario-created',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scenario-created.component.html',
  styleUrls: ['./scenario-created.component.css'],
})
export class ScenarioCreatedComponent {
  selectedCharacters = 1;
  userPlot: string = '';
  charactersArray: { name: string; trait: string; appearance: string }[] = [];

  constructor(private router: Router) {
    this.updateCharactersArray();
  }

  selectCharacters(num: number) {
    this.selectedCharacters = num;
    this.updateCharactersArray();
  }

  updateCharactersArray() {
    // Ajuster la taille du tableau `charactersArray` en fonction du nombre sélectionné
    this.charactersArray = Array.from({ length: this.selectedCharacters }, () => ({
      name: '',
      trait: 'courageux',
      appearance: 'grand',
    }));
  }

  generateScenario() {
    // Envoyer les données à la prochaine page
    this.router.navigate(['/reponseIA'], {
      state: {
        plot: this.userPlot,
        characters: this.charactersArray,
      },
    });
  }
}
