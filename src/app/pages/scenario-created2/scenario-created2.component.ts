import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Character {
  name: string;
  trait: string[];
  appearance: string;
}

@Component({
  selector: 'app-scenario-created',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scenario-created2.component.html',
  styleUrls: ['./scenario-created2.component.css'],
})


export class ScenarioCreated2Component {
  selectedCharacters = 1;
  userPlot: string = '';
  charactersArray: { name: string; trait: string[]; appearance: string }[] = [];
  personalityTraits = ['courageux', 'intelligent', 'mysterieux', 'loyal', 'creatif'];

  currentCharacter: Character = { name: '', trait: [], appearance: 'grand' }; // Trait typé comme string[]
  selectedCharacterIndex: number | null = null; // Indice du personnage actuellement sélectionné
  

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

  onTraitChange(trait: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      if (!this.currentCharacter.trait.includes(trait)) {
        this.currentCharacter.trait.push(trait); // Ajout de la chaîne au tableau
      }
    } else {
      this.currentCharacter.trait = this.currentCharacter.trait.filter(t => t !== trait); // Suppression
    }
  }  
  

  addNewCharacter() {
    // Si un personnage était sélectionné, on le sauvegarde
    if (this.selectedCharacterIndex !== null) {
      this.charactersArray[this.selectedCharacterIndex] = { ...this.currentCharacter };
    }
  
    // Réinitialiser le formulaire
    this.currentCharacter = { name: '', trait: [], appearance: 'grand' };
    this.selectedCharacterIndex = null; // Pas de sélection
  }

  selectCharacter(index: number) {
    // Sauvegarder les données actuelles si un autre personnage était en cours d'édition
    if (this.selectedCharacterIndex !== null) {
      this.charactersArray[this.selectedCharacterIndex] = { ...this.currentCharacter };
    }
  
    // Charger le personnage sélectionné
    this.currentCharacter = { ...this.charactersArray[index] };
    this.selectedCharacterIndex = index;
  }

  validateCharacter() {
    if (this.selectedCharacterIndex !== null) {
      // Si un personnage est en cours d'édition, sauvegarder les données
      this.charactersArray[this.selectedCharacterIndex] = { ...this.currentCharacter };
    } else {
      // Sinon, ajouter un nouveau personnage à la liste
      this.charactersArray.push({ ...this.currentCharacter });
    }
  
    // Réinitialiser le formulaire et désélectionner tout personnage
    this.currentCharacter = { name: '', trait: [], appearance: 'grand' };
    this.selectedCharacterIndex = null;
  }
  
  
}