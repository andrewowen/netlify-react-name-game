import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    const { currentScore, resetScore } = this.props;
    return (
      <div className="header-container">
        <h1>Name Game</h1>
        <p>Flip tiles to match faces!</p>

        <div>
          <p>Current Score: {currentScore}</p>
        </div>
        <div>
          <button className="header-reset-button" onClick={() => resetScore()}>
            <span className="foo">
              <h3>Reset Score</h3>
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
