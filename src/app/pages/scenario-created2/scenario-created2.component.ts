import { Component } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../movie.service';


interface Character {
  nomPersonnage: string;
  traitsPersonnalite: string[];
  description: string;
}

@Component({
  selector: 'app-scenario-created',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scenario-created2.component.html',
  styleUrls: ['./scenario-created2.component.css'],
})
export class ScenarioCreated2Component {
  isLoading = false;

  selectedCharacters = 1;
  userPlot: string = '';
  titre: string = '';
  charactersArray: Character[] = [];
  personalityTraits = ['courageux', 'intelligent', 'mysterieux', 'loyal', 'creatif'];
  currentCharacter: Character = {nomPersonnage: '', traitsPersonnalite: [], description: 'grand'};
  selectedCharacterIndex: number | null = null;
  styleId: number | null = null;

  showModal: boolean = false;
  showAlertModal: boolean = false;



  errors = {
    nomPersonnage: false,
    traitsPersonnalite: false,
  };

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

  validateForm() {
    this.errors.nomPersonnage = !this.currentCharacter.nomPersonnage.trim();
    this.errors.traitsPersonnalite = this.currentCharacter.traitsPersonnalite.length === 0;
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

    setTimeout(() => {
      const listElement = document.getElementById('character-list');
      if (listElement) {
        listElement.scrollTop = listElement.scrollHeight;
      }
    }, 0);
  }

  selectCharacter(index: number) {
    if (this.selectedCharacterIndex !== null) {
      this.charactersArray[this.selectedCharacterIndex] = {...this.currentCharacter};
    }
    this.currentCharacter = {...this.charactersArray[index]};
    this.selectedCharacterIndex = index;
  }

  validateCharacter() {
    this.validateForm();

    if (this.errors.nomPersonnage || this.errors.traitsPersonnalite) {
      console.error("Validation échouée : Corrigez les erreurs dans le formulaire.");
      return;
    }

    if (this.selectedCharacterIndex !== null) {
      this.charactersArray[this.selectedCharacterIndex] = {...this.currentCharacter};
    } else {
      this.charactersArray.push({...this.currentCharacter});
    }

    this.selectedCharacterIndex = null;
    this.currentCharacter = {nomPersonnage: '', traitsPersonnalite: [], description: 'grand'};
  }

  goToNextStep() {
    if (this.charactersArray.length === 0) {
      this.showAlert();
      return;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmScenario() {
    if (!this.userPlot.trim()) {
      console.error("Veuillez saisir une trame pour continuer.");
      return;
    }

    this.showModal = false;
    this.generateScenario();
  }



  deleteCharacter(index: number) {
    this.charactersArray.splice(index, 1);
    if (this.selectedCharacterIndex === index) {
      this.selectedCharacterIndex = null;
      this.currentCharacter = { nomPersonnage: '', traitsPersonnalite: [], description: 'grand' };
    } else if (this.selectedCharacterIndex !== null && this.selectedCharacterIndex > index) {
      this.selectedCharacterIndex--;
    }
  }

  editCharacter(index: number) {
    this.selectCharacter(index);
  }


  generateScenario() {
    if (!this.titre || !this.userPlot || this.charactersArray.length === 0) {
      console.error("Erreur : Le titre, la trame ou les personnages sont manquants !");
      return;
    }
    this.isLoading = true;
    console.log(this.styleId,this.titre,this.userPlot,this.charactersArray);
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
  goBack() {
    this.router.navigate(['/scenarios']);
  }

  showAlert() {
    this.showAlertModal = true;
  }

  closeAlertModal() {
    this.showAlertModal = false;
  }

}
