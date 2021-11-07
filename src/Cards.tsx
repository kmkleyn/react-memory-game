//import { runInThisContext } from 'vm';
export class Deck {
  cards: Card[] = [];
}
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
    // this.src = `img/${value}_${suit}.svg`;
    this.flipped = false;
    this.matched = false;
  }
}