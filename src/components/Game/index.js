import React, { Component } from "react";
import Nav from "../Nav";
import Container from "../Container";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import data from "../../data.json";

class Game extends Component {
  state = {
    data,
    score: 0,
    topScore: 0,
    card1: [],
    card2: [],
  };

  componentDidMount() {
    this.setState({ data: this.shuffleData(this.state.data) });
  }

  checkMatch = newData => {
    guessedCorrectly
    ? this.handleCorrectGuess(newData)
    : this.handleIncorrectGuess(newData);
  }

//card 1 and card 2 match
  handleCorrectGuess = newData => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      data: this.shuffleData(newData),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrectGuess = data => {
    this.setState({
      data: this.resetData(data),
      score: 0
    });
  };

  resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  handleItemClick = id => {
// push the id into card 1
//if card1 array.length > 0, push the id into card2 array
    const newData = this.state.data.map(item => {
      //map over each json item
      const newItem = { ...item };
      //only mapping over to obj to create new obj of items- we don't overwrite
      if (newItem.id === id) {
        //if ids match and it hasnt been clicked yet, set new state to have id of card 1 in it
        if (!newItem.clicked) {
          newItem.clicked = true;
          this.setState({ card1: [...this.state.card1, 'id'] }) 
        }
      }
      return newItem;

    });
    guessedCorrectly
      ? this.handleCorrectGuess(newData)
      : this.handleIncorrectGuess(newData);
  };

  render() {
    return (
      <div>
        <Nav score={this.state.score} topScore={this.state.topScore} />
        <Container>
          {this.state.data.map(item => (
            <ClickItem
              key={item.id}
              id={item.id}
              handleClick={this.handleItemClick}
              image={item.image}
            />
          ))}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Game;
