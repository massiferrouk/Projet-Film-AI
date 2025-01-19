import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieCardComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ia-movie-app';

  selectedCharacters = 1;
  selectedDiscussionIndex: number | null = null;
  discussions: { name: string; scenario: string }[] = [];

  userPlot: string = '';

  updateCharacters(number: number) {
    this.selectedCharacters = number;
  }

  get charactersArray() {
    return Array(this.selectedCharacters).fill(0).map((_, i) => i + 1);
  }

  selectDiscussion(index: number) {
    this.selectedDiscussionIndex = index;
  }

  generateNewScenario() {
    const newScenario = {
      name: `Film ${this.discussions.length + 1}`,
      scenario: `Voici le scénario généré pour le Film ${
        this.discussions.length + 1
      }.`
    };

    this.discussions.push(newScenario);
    this.selectedDiscussionIndex = this.discussions.length - 1;
  }
}

