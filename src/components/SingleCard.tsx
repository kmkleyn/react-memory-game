import './SingleCard.css'
import IMAGES from '../img';
import { Card } from '../Cards';

export default function SingleCard(props:{card: Card, handleChoice: (card: Card) => void}) {
  const card = props.card;
  const handleChoice = props.handleChoice;
  var display = {};
  const handleClick = () => {
    handleChoice(card);
  }

  // if the card has been matched the style should be set to display none
  if (card.matched === true) {
    display = {
      display: "none"
    }
  }
    return (
      <div className="card">
          <div>
            <img className="front" 
              src={card.src.default} 
              alt="card front" 
              style={display}
            />
            <img 
              onClick={() => handleClick()} 
              className="back" 
              src={IMAGES[54].default} 
              alt="card back"
              style={display}
            />
          </div>
        </div>
    )
}