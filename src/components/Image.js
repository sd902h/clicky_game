import React from "react";

function Image(props) {
  return (
    <div onClick={props.cardClicked} className="card">
      <div className="img-container">
        <img alt={props.name} src={props.link} />
      </div>
    </div>
  );
}

export default Image;
