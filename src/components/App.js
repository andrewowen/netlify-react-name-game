import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';

class App extends Component {
  componentWillMount = async () => {};

  render() {
    return (
      <div className="container">
        <Header />
        <GameBoard />
      </div>
    );
  }
}

export default App;
