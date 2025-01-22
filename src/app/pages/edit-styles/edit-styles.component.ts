import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StylesService } from '../../services/styles.service';
import { Style } from '../../models/style.model';

@Component({
  selector: 'app-edit-styles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-styles.component.html',
  styleUrls: ['./edit-styles.component.css'],
})
export class EditStylesComponent {
  styles: Style[] = [];
  showEditModal = false;
  showCreateModal = false;
  editedStyleIndex: number | null = null;
  editedStyleTitle: string = '';
  newStyleTitle: string = '';
  newStyleImg: string | null = null;

  constructor(private router: Router, private stylesService: StylesService) {
    this.styles = this.stylesService.getStyles();
  }

  deleteStyle(index: number) {
    this.stylesService.deleteStyle(index);
    this.styles = this.stylesService.getStyles();
  }

  openEditModal(index: number) {
    this.editedStyleIndex = index;
    this.editedStyleTitle = this.styles[index].title;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editedStyleIndex = null;
    this.editedStyleTitle = '';
  }

  saveEdit() {
    if (this.editedStyleIndex !== null) {
      this.styles[this.editedStyleIndex].title = this.editedStyleTitle;
      this.stylesService.setStyles(this.styles);
    }
    this.closeEditModal();
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.newStyleTitle = '';
    this.newStyleImg = null;
  }

  saveCreate() {
    if (this.newStyleTitle && this.newStyleImg) {
      this.stylesService.addStyle({ title: this.newStyleTitle, imgSrc: this.newStyleImg });
      this.styles = this.stylesService.getStyles();
    }
    this.closeCreateModal();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newStyleImg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.router.navigate(['/scenarios']);
  }
}
