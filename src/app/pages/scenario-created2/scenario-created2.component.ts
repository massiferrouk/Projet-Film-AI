import { Component } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../movie.service';
import {LoadingModalComponent} from '../../loading-modal/loading-modal.component'; // Assurez-vous d'importer le bon service


interface Character {
  nomPersonnage: string;
  traitsPersonnalite: string[];
  description: string;
}

@Component({
  selector: 'app-scenario-created',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingModalComponent],
  templateUrl: './scenario-created2.component.html',
  styleUrls: ['./scenario-created2.component.css'],
})
export class ScenarioCreated2Component {
  isLoading = false;

  selectedCharacters = 1;
  userPlot: string = '';
  titre: string = ''; // Champ titre
  charactersArray: { nomPersonnage: string; traitsPersonnalite: any[]; description: string }[] = []; // Liste vide au démarrage
  personalityTraits = ['courageux', 'intelligent', 'mysterieux', 'loyal', 'creatif'];
  currentCharacter: Character = {nomPersonnage: '', traitsPersonnalite: [], description: 'grand'};
  selectedCharacterIndex: number | null = null;
  styleId: number | null = null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private movieService: MovieService,
  ) {

  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.styleId = +params['styleId'];
      console.log('Style ID:', this.styleId);
    });
  }

  selectCharacters(num: number) {
    this.selectedCharacters = num;
    this.updateCharactersArray();
  }

  updateCharactersArray() {
    this.charactersArray = Array.from({length: this.selectedCharacters}, () => ({
      nomPersonnage: '',
      traitsPersonnalite: [],
      description: 'grand',
    }));
  }

  onTraitChange(trait: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.currentCharacter.traitsPersonnalite.includes(trait)) {
        this.currentCharacter.traitsPersonnalite.push(trait);
      }
    } else {
      this.currentCharacter.traitsPersonnalite = this.currentCharacter.traitsPersonnalite.filter(t => t !== trait);
    }
  }

  addNewCharacter() {
    if (this.selectedCharacterIndex !== null) {
      this.charactersArray[this.selectedCharacterIndex] = {...this.currentCharacter};
    }
    this.currentCharacter = {nomPersonnage: '', traitsPersonnalite: [], description: 'grand'};
    this.selectedCharacterIndex = null;
  }

  selectCharacter(index: number) {
    if (this.selectedCharacterIndex !== null) {
      this.charactersArray[this.selectedCharacterIndex] = {...this.currentCharacter};
    }
    this.currentCharacter = {...this.charactersArray[index]};
    this.selectedCharacterIndex = index;
  }

  validateCharacter() {
    if (this.selectedCharacterIndex !== null) {
      // Mise à jour du tableau avec le personnage actuel
      this.charactersArray[this.selectedCharacterIndex] = {...this.currentCharacter};
    } else {
      this.charactersArray.push({...this.currentCharacter});
    }

    this.selectedCharacterIndex = null;
    this.currentCharacter = {nomPersonnage: '', traitsPersonnalite: [], description: 'grand'};
  }

  generateScenario() {
    if (!this.titre || !this.userPlot || this.charactersArray.length === 0) {
      console.error("Erreur : Le titre, la trame ou les personnages sont manquants !");
      return;
    }
    this.isLoading = true;
    this.movieService.generateScenario(this.styleId, this.titre, this.charactersArray, this.userPlot).subscribe({
      next: (response) => {
        const newScenario = {
          titre: this.titre,
          scenario: response || 'Aucun scénario généré',
          styleId: this.styleId,
        };

        this.router.navigate(['/reponseIA'], {
          state: {
            scenario: newScenario.scenario
          },
        })
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du traitement du scénario :', err);
        this.isLoading = false;
      },
    });
  }
}
