import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../services/cards.service';
import { Card } from '../../../types';

@Component({
  selector: 'app-constellation',
  templateUrl: './constellation.component.html',
  styleUrl: './constellation.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class ConstellationComponent implements OnInit {
  cards: Card[] = [];
  private imageExtensions: { [key: string]: string } = {
    default: 'jpg',
    wisdomKeepers: 'jpeg',
    tarot: 'png',
    osho: 'jpg',
  };

  constructor(private cardsService: CardsService) {}

  async ngOnInit() {
    this.cards = await this.cardsService.getCards();
    this.setDisplayNames();
  }

  getImagePath(cardName: string): string {
    const extension = this.imageExtensions[cardName] || 'jpg';
    return `assets/${cardName}.${extension}`;
  }

  private setDisplayNames(): void {
    this.cards.forEach((card: Card) => {
      switch (card.name) {
        case 'default': {
          card.displayName = 'Alap';
          break;
        }
        case 'wisdomKeepers': {
          card.displayName = 'Bölcsesség-\nőrzők';
          break;
        }
        case 'tarot': {
          card.displayName = 'Tarot';
          break;
        }
        case 'osho': {
          card.displayName = 'Osho Zen-tarot';
          break;
        }
      }
    });
  }
}
