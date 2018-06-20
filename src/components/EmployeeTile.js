import React from "react";
import CardFlip from "react-card-flip";
import "./EmployeeTile.css";

class EmployeeTile extends React.Component {
  render() {
    const { details, staffKey, isFlipped, handleFlip } = this.props;
    return (
      <CardFlip isFlipped={isFlipped} style={{ height: "200px" }}>
        <div
          className="game-tile-front"
          key="front"
          onClick={() => handleFlip(details, staffKey)}
        />
        <div key="back">
          <img
            className="game-tile-back"
            src={details.headshot.url}
            alt={`${details.firstName} ${details.lastName}`}
            onClick={() => handleFlip(details, staffKey)}
          />
        </div>
      </CardFlip>
    );
  }
}

export default EmployeeTile;
