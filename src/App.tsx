import React from 'react';
import logo from './logo.svg';
import IMAGES from './img'
import { Counter } from './features/counter/Counter';
import './App.css';
import { Deck, Card } from './Cards';

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

const fullDeck = createFullDeck(splitDeckA, splitDeckB);
getImages(fullDeck)

const shuffleDeck = (deck: Deck) => {
  const shuffledCards = deck.cards.sort(() => Math.random() - 0.5);
  return shuffledCards;
} 

const shuffledDeck = shuffleDeck(fullDeck);

function App() {
  return (
    <div className="App">
      <div className="card-grid">
        {shuffledDeck.map((card) => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src.default} alt="card front" />
              <img className="back" src={IMAGES[54].default} alt="card back" />
            </div>
          </div>
        ))}
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;