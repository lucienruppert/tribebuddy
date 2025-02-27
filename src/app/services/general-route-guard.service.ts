import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralRouteGuardService {
  constructor(
    private authentication: AuthService,
    private router: Router
  ) {}

  public canActivate(): boolean | Promise<boolean> {
    const userEmail = this.authentication.getUserEmail();
    if (!userEmail) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
