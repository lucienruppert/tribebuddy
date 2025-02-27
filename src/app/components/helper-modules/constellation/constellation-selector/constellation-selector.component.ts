import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/authentication.service';
import { ClientsService } from '../../../../services/clients.service';
import { ConstellationsService } from '../../../../services/constellations.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { GenekeysPreselectorComponent } from '../genekeys-preselector/genekeys-preselector.component';
import {
  cardTranslations,
  constellationTranslations,
} from '../../../../translations';
import {
  Card,
  Constellation,
  Client,
  Session,
  SessionResponse,
} from '../../../../types';

@Component({
  selector: 'app-constellation-selector',
  templateUrl: './constellation-selector.component.html',
  styleUrls: ['./constellation-selector.component.css'],
  standalone: true,
  imports: [FormsModule, MatProgressSpinnerModule, NgIf, NgFor, DialogModule],
})
export class ConstellationSelectorComponent implements OnInit {
  isLoading = true;
  cards: Card[] = [];
  constellations: Constellation[] = [];
  clients: Client[] = [];
  selectedType: 'personal' | 'personalGroup' | 'group' = 'personal';
  userEmail: string = '';
  selectedCard: string = '';
  selectedConstellation: number = 0;
  selectedClient: string = '';
  newClientName: string = '';
  selectedClientId?: number;
  newClientEmail: string = '';

  constructor(
    private constellationsService: ConstellationsService,
    private clientsService: ClientsService,
    private authService: AuthService,
    private snackBar: SnackBarService,
    private dialog: Dialog,
    private router: Router
  ) {
    this.userEmail = this.authService.getUserEmail() || '';
  }

  async ngOnInit() {
    try {
      this.isLoading = true;
      const [cards, constellations] = await Promise.all([
        this.constellationsService.getCardTypes(),
        this.constellationsService.getConstellations(),
      ]);

      this.cards = cards.sort((a, b) => {
        if (a.name.toLowerCase() === 'wisdomkeepers') return -1;
        if (b.name.toLowerCase() === 'wisdomkeepers') return 1;
        return 0;
      });

      this.constellations = constellations.sort((a, b) => {
        if (a.name.toLowerCase() === 'genekeys') return -1;
        if (b.name.toLowerCase() === 'genekeys') return 1;
        return 0;
      });

      if (this.cards.length > 0) {
        this.selectedCard = this.cards[0].id;
      }
      if (this.constellations.length > 0) {
        this.selectedConstellation = this.constellations[0].id;
      }

      if (this.userEmail) {
        await new Promise<void>(resolve => {
          this.clientsService
            .getClientsByEmail(this.userEmail)
            .subscribe(clients => {
              this.clients = clients.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
              resolve();
            });
        });
      }
    } finally {
      this.isLoading = false;
    }
  }

  onConstellationChange() {
    this.selectedCard = this.needsCards() ? this.cards[0].id : '';
  }

  getTranslatedCardName(cardName: string): string {
    return cardTranslations[cardName] || cardName;
  }

  getTranslatedConstellationName(name: string): string {
    return constellationTranslations[name] || name;
  }

  getFilteredConstellations(): Constellation[] {
    return this.constellations.filter(c => {
      switch (this.selectedType) {
        case 'personal':
          return c.isPersonal;
        case 'personalGroup':
          return c.isPersonalGroup;
        case 'group':
          return c.isGroup;
        default:
          return false;
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    if (this.selectedType === 'personal') {
      if (this.selectedClient === 'new') {
        if (!this.newClientEmail || !this.isValidEmail(this.newClientEmail)) {
          return false;
        }
        return !!(
          (!this.needsCards() || this.selectedCard) &&
          this.newClientName &&
          this.newClientEmail
        );
      }
      return !!(
        (!this.needsCards() || this.selectedCard) &&
        this.selectedClient &&
        this.selectedClient !== ''
      );
    }
    return !this.needsCards() || !!this.selectedCard;
  }

  async onSubmit(): Promise<void> {
    try {
      if (!this.isFormValid()) return;

      // Set client name (new or old)
      const clientName =
        this.selectedClient === 'new'
          ? this.newClientName
          : this.selectedClient;

      // Create client session
      const session: Session = {
        cardId: parseInt(this.selectedCard),
        constellationType: this.selectedConstellation,
        type: this.selectedType,
        client: clientName,
        clientEmail:
          this.selectedClient === 'new'
            ? this.newClientEmail
            : this.clients.find(c => c.name === this.selectedClient)?.email ||
              '',
        clientId:
          this.selectedClient === 'new' ? undefined : this.selectedClientId,
        helperId: parseInt(this.authService.getUserId()),
      };

      this.clientsService.storeConstellationSession(session).subscribe({
        next: response => {
          const sessionResponse = response as SessionResponse;
          sessionStorage.setItem(
            'clientId',
            sessionResponse.clientId.toString()
          );
          sessionStorage.setItem('sessionId', sessionResponse.id.toString());

          const selectedConstellation = this.constellations.find(
            c => c.id === this.selectedConstellation
          );

          if (selectedConstellation?.name.toLowerCase() === 'genekeys') {
            this.clientsService
              .getGenekeysById(sessionResponse.clientId)
              .subscribe({
                next: response => {
                  if (!response || Object.keys(response).length === 0) {
                    this.dialog.open(GenekeysPreselectorComponent, {
                      autoFocus: false,
                    });
                  } else {
                    this.snackBar.showMessage(
                      `${this.clientsService.getClientName()} génkulcsai már szerepelnek a rendszerben.`
                    );
                    setTimeout(() => {
                      this.snackBar.showMessage('Eredményes állítást kívánok!');
                      this.router.navigate(['session', sessionResponse.id]);
                    }, 1500);
                  }
                },
                error: error => {
                  console.error('Error checking genekeys:', error);
                  // Open dialog anyway in case of error to ensure user can input data
                  this.dialog.open(GenekeysPreselectorComponent, {
                    autoFocus: false,
                  });
                },
              });
            return;
          }
        },
        error: error => {
          let errorMessage = 'Hiba történt a létrehozás során.';

          if (error.error?.message) {
            // Handle array of messages
            if (Array.isArray(error.error.message)) {
              errorMessage = error.error.message.join(', ');
            } else {
              errorMessage = error.error.message;
            }
          }

          this.snackBar.showMessage(errorMessage);
          console.error('Error storing session:', error);
        },
      });
    } catch (error) {
      let errorMessage = 'Váratlan hiba történt.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      this.snackBar.showMessage(errorMessage);
      console.error('Submission error:', error);
    }
  }

  onClientChange(clientName: string) {
    const selectedClient = this.clients.find(c => c.name === clientName);
    this.selectedClientId = selectedClient?.id;
    this.clientsService.setClientName(selectedClient?.name || '');
  }

  needsCards(): boolean {
    const selectedConst = this.constellations.find(
      c => c.id === this.selectedConstellation
    );
    return selectedConst?.needsCard || false;
  }
}
