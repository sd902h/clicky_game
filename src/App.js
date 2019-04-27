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
    clickedIds: []
  };

  increaseScore = id => {
    this.setState(state => ({ score: state.score + 1 }));
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
    let gameOver = false;
    console.log("Previously clickedIds = " + this.state.clickedIds);
    this.state.clickedIds.forEach(clickedId => {
      if (id === clickedId) {
        console.log("YOU'VE CLICKED ON THIS BEFORE!");
        gameOver = true;
        this.setState(state => ({
          score: 0,
          clickedIds: [],
          friends: this.shuffleCards(friends)
        }));
      }
    });

    if (!gameOver) {
      this.saveClickedId(id);
      this.setState(state => ({ score: state.score + 1 }));
    }
    console.log("Current Score = " + this.state.score);
    this.state.clickedIds.forEach(clickedId => {
      console.log("Current CLICKED IDS = " + clickedId);
    });
  };

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>
          Friends List <div>{this.state.score}</div>
        </Title>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
            newScore={this.increaseScore}
            cardClicked={this.OnCardClick}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
