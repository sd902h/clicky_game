import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <div onClick={() => props.cardClicked(props.id)} className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
}

export default FriendCard;
