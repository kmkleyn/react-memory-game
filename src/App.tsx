import React, {useState} from 'react';
import IMAGES from './img';
import './App.css';
import { Deck, Card } from './Cards';
import SingleCard from './components/SingleCard';

// const importAll = (r: {}) => {
//   let images = {};
//   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//   return images;
// }

const FaceValue = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
]

const createSuit = (suit: string) => {
  var newSuit = new Deck();
  console.log("newSuit", newSuit)
  FaceValue.forEach((faceValue) => {
    var newCard = new Card(suit, faceValue);
    newSuit.cards.push(newCard);
  });

  return newSuit;
}

const createSplitDeck = (suit1: Deck, suit2: Deck, jokerColour: string) => {
  var splitDeck = new Deck();
  var counter = 1;
  suit1.cards.forEach((card) => {
    card.matchId = counter
    counter++;
    splitDeck.cards.push(card);
  });
  suit2.cards.forEach((card) => {
    card.matchId = counter
    counter++;
    splitDeck.cards.push(card);
  });
  var joker = new Card(jokerColour, "Joker");
  joker.matchId = 27;
  splitDeck.cards.push(joker);

  return splitDeck;
}

const createFullDeck = (splitDeck1: Deck, splitDeck2: Deck) => {
  var fullDeck = new Deck();
  var counter = 1;
  splitDeck1.cards.forEach((card) => {
    card.id = counter;
    counter++;
    fullDeck.cards.push(card);
  });
  splitDeck2.cards.forEach((card) => {
    card.id = counter;
    counter++;
    fullDeck.cards.push(card);
  });

  return fullDeck;
}

const getImages = (fullDeck: Deck) => {
  var counter: number = 0
  fullDeck.cards.forEach(
    (card) => {
    card.src = IMAGES[counter]
    counter++;
  })
}

const splitDeckA = createSplitDeck(createSuit("club"), createSuit("diamond"), "red");
const splitDeckB = createSplitDeck(createSuit("spade"), createSuit("heart"), "black");

const fullDeck: Deck = createFullDeck(splitDeckA, splitDeckB);
getImages(fullDeck)

function App() {
  const [cards, setCards] = useState<Card[]>([]);

  const shuffleDeck = () => {
    const shuffledCards = [...fullDeck.cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    console.log(cards);
  }

  return (
    <div className="App">
      <h1>Memory</h1>
      <button onClick={() => shuffleDeck()}>Reset Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;