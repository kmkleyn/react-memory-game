//import { runInThisContext } from 'vm';
export class Deck {
  cards: Card[] = [];
}

// NOTE: The matchId is used to check whether the two cards chosen match one another
// i.e. Cards that have the same colour and number will have the same matchId
export class Card {
  id: number;
  matchId: number;
  src: any;
  suit: string;
  value: string;
  flipped: boolean;
  matched: boolean;

  constructor(suit: string, value: string) {
    this.suit = suit;
    this.value = value;
    this.flipped = false;
    this.matched = false;
  }
}