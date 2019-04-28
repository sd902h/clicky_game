import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    highestScore: 0,
    clickedIds: []
  };

  increaseScore = id => {
    this.setState(state => ({ score: state.score + 1 }));
  };

  saveHighestScore = id => {
    var newHighScore = this.state.score;
    if (newHighScore > this.state.highestScore)
      this.setState(state => ({ highestScore: newHighScore }));
  };

  saveClickedId = id => {
    var newClickedIds = this.state.clickedIds;
    newClickedIds.push(id);
    this.setState(state => ({ clickedIds: newClickedIds }));
    console.log(newClickedIds, "new clicked Id");
  };

  shuffleCards(friends) {
    var i = friends.length,
      j = 0,
      temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));

      temp = friends[i];
      friends[i] = friends[j];
      friends[j] = temp;
    }
    return friends;
  }

  OnCardClick = id => {
    console.log("This clickedId = " + id);
    console.log("Previously clickedIds = " + this.state.clickedIds);
    let gameOver = false;
    this.state.clickedIds.forEach(clickedId => {
      if (id === clickedId) {
        console.log("YOU'VE CLICKED ON THIS BEFORE!");
        gameOver = true;
        this.saveHighestScore(id);
        this.setState(state => ({
          score: 0,
          clickedIds: [],
          friends: this.shuffleCards(friends)
        }));
      }
    });

    if (!gameOver) {
      this.saveClickedId(id);
      this.setState(state => ({
        friends: this.shuffleCards(friends),
        score: state.score + 1
      }));
    }
    console.log("Current Score = " + this.state.score);
    this.state.clickedIds.forEach(clickedId => {
      console.log("Current CLICKED IDS = " + clickedId);
    });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>
          Clicky Game
          <div>Score: {this.state.score}</div>
          <div>Highest Score: {this.state.highestScore}</div>
        </Title>
        {this.state.friends.map(friend => (
          <FriendCard
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            newScore={this.increaseScore}
            cardClicked={this.OnCardClick}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
