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
  charactersArray: { name: string; trait: string[]; appearance: string }[] = [];

  constructor(private router: Router) {
    this.updateCharactersArray();
  }

  selectCharacters(num: number) {
    this.selectedCharacters = num;
    this.updateCharactersArray();
  }

  updateCharactersArray() {
    this.charactersArray = Array.from({ length: this.selectedCharacters }, () => ({
      name: '',
      trait: [],
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

  onTraitChange(characterIndex: number, trait: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      if (!this.charactersArray[characterIndex].trait.includes(trait)) {
        this.charactersArray[characterIndex].trait.push(trait);
      }
    } else {
      this.charactersArray[characterIndex].trait =
        this.charactersArray[characterIndex].trait.filter(t => t !== trait);
    }
  }
  
}
