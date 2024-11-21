import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ShowVideoComponent } from '../show-video/show-video.component';
import videos from './videos';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent {
  public videoData: Array<{ id: string; time: string; thumbnail: string }> = videos;

  constructor(private dialog: Dialog) {}

  public openDialog(id: string): void {
    this.dialog.open(ShowVideoComponent, {
      data: { id },
    });
  }
}
