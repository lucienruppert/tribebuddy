import { SnackBarService } from './../../services/snackbar.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  public email: string = '';
  public errorMessage: string = '';

  constructor(private subscription: SubscriptionService, private snackbar: SnackBarService) {}

  ngOnInit() {}

  public async subscribe(): Promise<void> {
    if (this.email === '') return;
    let snackbarMessage: string = '';
    try {
      console.log(this.email);
      await this.subscription.subscribe(this.email);
      snackbarMessage = 'Az email hozzáadása sikerült.';
      this.snackbar.showSnackBar(snackbarMessage);
      this.email = '';
    } catch (error: unknown) {
      const typedError = error as string;
      this.errorMessage = typedError;
    }
  }
}
