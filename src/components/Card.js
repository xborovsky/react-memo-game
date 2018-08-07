import React from 'react';

const Card = ({isOpen, image, onCardClicked}) =>
    <div className={`card ${isOpen ? 'is-fliped' : ''}`} onClick={onCardClicked}>
        <img src={image} alt="Card front" className="img-fluid front" />
        <img src='/img/card-bg.jpg' alt="Card back" className="img-fluid back" />
    </div>
;

export default Card;