import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  @Input() imgArray: string[] = [];

  count = 0;
  imgRowWidth = '100%';

  moveForward() {
    if (this.count == this.imgArray.length - 1) return;
    this.count++;
  }
  moveBack() {
    if (this.count == 0) return;
    this.count--;
  }
}
