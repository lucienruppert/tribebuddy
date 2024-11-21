import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public isMobile: boolean = false;
  public activeMenu: string = '';

  ngOnInit() {}
}
