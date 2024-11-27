import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  @Input() images: { src: string; alt: string; title: string; caption: string; width?: string; height?: string }[] = [];
}
