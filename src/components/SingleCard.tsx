import './SingleCard.css'
import IMAGES from '../img';
import { Card } from '../Cards';

export default function SingleCard({card} : {card: Card}) {
    return (
        <div className="card">
            <div>
              <img className="front" src={card.src.default} alt="card front" />
              <img className="back" src={IMAGES[54].default} alt="card back" />
            </div>
          </div>
    )
}