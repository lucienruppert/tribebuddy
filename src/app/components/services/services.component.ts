import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  public goToContactPage(): void {
    this.router.navigate(['..', 'contact'], {
      relativeTo: this.route,
    });
  }
}
