import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <h1>Name Game</h1>
        <p>
          Flip tiles to match faces to names! See how many you can get in 30
          seconds!
        </p>
      </div>
    );
  }
}

export default Header;
