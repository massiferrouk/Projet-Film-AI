import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() title!: string;
  @Input() imgSrc: string | undefined;

  ngOnInit() {
    console.log('Image Source:', this.imgSrc);
  }
}
