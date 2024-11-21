import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // public goToBenefitsPage(): void {
  //   this.router.navigate(['benefits'], {
  //     relativeTo: this.route,
  //   });
  // }

}
