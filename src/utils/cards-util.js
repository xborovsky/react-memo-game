const cards = ['/img/jerry.png', '/img/mickey.png', '/img/minnie.gif', '/img/monster.png', '/img/nemo.jpg', '/img/tom.png'];

let deck = [...cards, ...cards];

export const shuffleCards = () => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};