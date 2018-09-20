import React, { Component } from 'react';
import CardFlip from 'react-card-flip';
import './EmployeeTile.css';

class EmployeeTile extends Component {
  render() {
    const {
      details,
      staffKey,
      isFlipped,
      handleFlip,
      readyToClick
    } = this.props;
    return (
      <CardFlip isFlipped={isFlipped}>
        <button
          disabled={!readyToClick}
          className="game-tile-front"
          key="front"
          onClick={() => handleFlip(details, staffKey)}
        />
        <div key="back">
          <img
            className="game-tile-back"
            src={details.headshot.url}
            alt={`${details.firstName} ${details.lastName}`}
          />
        </div>
      </CardFlip>
    );
  }
}

export default EmployeeTile;
