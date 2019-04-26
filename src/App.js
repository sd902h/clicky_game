import React, { Component } from "react";
// import FriendCard from "./components/FriendCard";
// import Wrapper from "./components/Wrapper";
import Image from "./components/Image";
import friends from "./friends.json";

class App extends Component {
  state = {
    friends,
    score: 0,
    clickedIds: []
  };

  OnCardClick = id => {
    console.log("This clickedId = " + id);
    let gameOver = false;
    console.log("Previously clickedIds = " + this.state.clickedIds);
    this.state.friends.forEach(friend => {
      this.state.clickedIds.forEach(clickedId => {
        if (friend.id === clickedId) {
          console.log("YOU'VE CLICKED ON THIS BEFORE!");
          gameOver = true;
          this.setState(state => ({
            score: 0,
            clickedIds: []
          }));
        }
      });
    });

    if (!gameOver) {
      console.log("NEW CLICK!");
      this.saveClickedId(id);
      this.setState(state => ({ score: state.score + 1 }));
    }

    console.log("STATUS:");
    console.log("Current Score = " + this.state.score);
    this.state.clickedIds.forEach(clickedId => {
      console.log("Current CLICKED IDS = " + clickedId);
    });
  };

  increaseScore = id => {
    this.setState(state => ({ score: state.score + 1 }));
  };

  saveClickedId = id => {
    this.state.clickedIds.push(id);
  };

  removeFriend = id => {
    const friends = this.state.friends.filter(friend => friend.id !== id);
    this.setState({ friends });
  };

  render() {
    const renderImage = friends.map(friend => (
      <Image
        key={friend.id}
        name={friend.name}
        link={friend.image}
        score={this.increaseScore}
        cardClicked={this.OnCardClick}
      />
    ));
    return (
      <div>
        {this.state.score}
        {renderImage}
      </div>
    );
  }
}

export default App;
