import React, {useState, useEffect} from 'react';
import IMAGES from './img';
import './App.css';
import { Deck, Card } from './Cards';
import SingleCard from './components/SingleCard';

// this array contains the face values on the cards
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

// the following three functions create a full deck of cards firstly by creating a suit,
// then half a deck consisting of one of each of the colours (and one Joker),
// and then a full deck consisting of the two half decks
const createSuit = (suit: string) => {
  var newSuit = new Deck();
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

// this method gets all the images for the deck of cards
const getImages = (fullDeck: Deck) => {
  var counter: number = 0
  fullDeck.cards.forEach(
    (card) => {
    card.src = IMAGES[counter]
    counter++;
  })
}

const splitDeckA = createSplitDeck(createSuit("club"), createSuit("heart"), "red");
const splitDeckB = createSplitDeck(createSuit("spade"), createSuit("diamond"), "black");

const fullDeck: Deck = createFullDeck(splitDeckA, splitDeckB);
getImages(fullDeck)

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [choiceOne, setChoiceOne] = useState<Card>();
  const [choiceTwo, setChoiceTwo] = useState<Card>();

  // this function shuffles the deck and resets all the matched cards to be unmatched
  const shuffleDeck = () => {
    const shuffledCards = [...fullDeck.cards].sort(() => Math.random() - 0.5);
    shuffledCards.forEach((card) => {
      if (card.matched === true) {
        card.matched = false;
      }
    });
    setCards(shuffledCards);
  }
  
  // this method sets the values of the two cards chosen
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // we now check if the two cards have been chosen and then if they match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      console.log("Card one: ", choiceOne);
      console.log("Card two: ", choiceTwo);
      // check to see if the two cards match but prevent the same card being matched to itself
      if (choiceOne.matchId === choiceTwo.matchId && choiceOne.id !== choiceTwo.id) {
        console.log("It's a match!");
        choiceOne.matched = true;
        choiceTwo.matched = true;
      } else if (choiceOne.matchId === choiceTwo.matchId && choiceOne.id === choiceTwo.id) {
        console.log("You can't match the same card to itself.")
      } else {
        console.log("Those cards do not match...");
      }
      resetTurn();
    }
  }, [choiceOne, choiceTwo])

  // this resets the values of the two card choices when the turn is over
  const resetTurn = () => {
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
  }

  return (
    <div className="App">
      <h1>Memory</h1>
      <button onClick={() => shuffleDeck()}>Reset Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;