import { Injectable } from '@angular/core';
import { Style } from '../models/style.model';

@Injectable({
  providedIn: 'root',
})
export class StylesService {
  private styles: Style[] = [
    { 
      title: 'Game of Thrones', 
      imgSrc: 'game-of-thrones1.jpg',
      description: 'description1'
    },
    { 
      title: 'Vikings',
      imgSrc: 'viking.jpg',
      description: 'description2'
    },
    { 
      title: 'La Casa de Papel', 
      imgSrc: 'la-casa-de-papel.jpg',
      description: 'description3'
    },
  ];

  getStyles(): Style[] {
    return this.styles;
  }

  setStyles(updatedStyles: Style[]): void {
    this.styles = updatedStyles;
  }

  addStyle(newStyle: Style): void {
    this.styles.push(newStyle);
  }

  deleteStyle(index: number): void {
    this.styles.splice(index, 1);
  }
}
