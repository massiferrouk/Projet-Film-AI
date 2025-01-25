import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { StylesService } from '../../services/styles.service';
import { Style } from '../../models/style.model';

@Component({
  selector: 'app-scenarios',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent {
  styles: Style[] = [];
  selectedStyleIndex: number | null = null;

  constructor(private router: Router, private stylesService: StylesService) {
    this.styles = this.stylesService.getStyles();
  }

  selectStyle(index: number) {
    this.selectedStyleIndex = index;
  }

  goToNextPage() {
    if (this.selectedStyleIndex !== null) {
      const styleId = this.selectedStyleIndex;
      this.router.navigate([`/scenariocreated2/${styleId}`]);
    }
  }

  navigateToEditStyles() {
    this.router.navigate(['/edit-styles']);
  }
}
