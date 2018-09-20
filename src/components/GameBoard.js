import React, { Component } from 'react';
import './GameBoard.css';
import EmployeeTile from './EmployeeTile';

class GameBoard extends Component {
  render() {
    const {
      shuffledStaff,
      matchedEmployees,
      currentEmployees,
      getNumFlipped,
      handleFlip
    } = this.props;
    const readyToClick = getNumFlipped() < 2;
    return (
      <div className="game-board-container">
        {Object.keys(shuffledStaff).map((key, details) => (
          <EmployeeTile
            key={key}
            staffKey={key}
            details={shuffledStaff[key]}
            isFlipped={
              matchedEmployees.includes(key) || currentEmployees.includes(key)
            }
            handleFlip={handleFlip}
            readyToClick={readyToClick}
          />
        ))}
      </div>
    );
  }
}

export default GameBoard;
