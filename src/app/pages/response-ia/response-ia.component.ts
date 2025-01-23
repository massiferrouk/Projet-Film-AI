import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response-ia',
  imports: [CommonModule],
  templateUrl: './response-ia.component.html',
  styleUrls: ['./response-ia.component.css'],
})
export class ResponseIaComponent {
  discussions: { name: string; scenario: string }[] = [];
  selectedDiscussionIndex: number | null = null;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    if (state) {
      const newScenario = {
        name: `Scénario ${this.discussions.length + 1}`,
        scenario: state['plot'],
      };

      this.discussions.push(newScenario);

      this.selectedDiscussionIndex = this.discussions.length - 1;
    }
  }

  selectDiscussion(index: number) {
    this.selectedDiscussionIndex = index;
  }

  generateNewScenario() {
    this.router.navigate(['/scenarios']);
  }
}
