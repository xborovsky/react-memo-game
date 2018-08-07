import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import { shuffleCards } from './utils/cards-util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards : [],
      open : [],
      solved : [],
      timeout : null,
      gameFinished : false
    };
  }

  componentDidMount() {
    this.restartGame();
  }

  restartGame() {
    this.setState({
      cards : shuffleCards(),
      open : Array(12).fill(false),
      solved : Array(12).fill(false)
    });
  }

  resetOpen() {
    const { open, solved } = this.state;
    let reset = new Array(open.length).fill(false);

    // setup solved as non-reset
    for (var i=0; i<reset.length; i++) {
      if (solved[i]) {
        reset[i] = true;
      }
    }

    this.setState({open : reset, timeout : null});

    return reset;
  }

  handleCardClicked = (idx) => {
    const { open, cards, solved } = this.state;
    let reset;

    if (this.state.timeout) { // clear timeout if 2 cards (non-solved) found
      clearTimeout(this.state.timeout);
      reset = this.resetOpen();
    }

    // open card
    let newOpen = reset ? [...reset] : [...open];
    newOpen[idx] = !newOpen[idx];

    this.setState({open : newOpen});

    let openItemsIndices = [];
    const openItems = newOpen.filter((item, idx) => {
      if (!solved[idx]) { // skip already solved
        if (item === true) {
          openItemsIndices.push(idx);
        }
        return item === true;
      }
      return false;
    });

    if (openItems.length === 2) {
      // check if solution found
      if (cards[openItemsIndices[0]] === cards[openItemsIndices[1]]) {
        const solved = [...this.state.solved];
        solved[openItemsIndices[0]] = solved[openItemsIndices[1]] = true;
        this.setState({solved});
        if (solved.filter(item => item === true).length === cards.length) {
          this.setState({gameFinished : true});
        }
      } else {
        // setup timeout for clearing non-solved cards
        let timeout = setTimeout(() => {
          this.resetOpen();
        }, 1000);
        this.setState({timeout : timeout});
      }
    }

  };

  render() {
    const {cards, open, gameFinished} = this.state;

    return (
      <div className="container">
        <div className="cards">
          {
            gameFinished ?
              <h1>Congratulations, you won!</h1> :
              <div className="row">
                {
                  cards.map((card, idx) =>
                    <div className="col-4 col-md-3" key={idx}>
                      <Card isOpen={open[idx]} image={card} onCardClicked={() => this.handleCardClicked(idx)} />
                    </div>
                  )
                }
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
