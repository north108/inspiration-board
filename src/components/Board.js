import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    axios.get(`${this.props.url}/${this.props.boardName}/cards`)
      .then((response) => {

        console.log(response.data)
        this.setState({
          cards: response.data
        });
      })
      .catch((error) => {
        console.log(error.message)
      })
    
  }

  makeCollection () {
    const cardCollection = this.state.cards.map((card, i) => {
      return <Card 
      cardText={card.card.text}
      cardEmoji={card.card.emoji}
      key={i}
      />
    });
    return cardCollection
  }


  render() {
    return (
      <div>
         {this.makeCollection()}
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
