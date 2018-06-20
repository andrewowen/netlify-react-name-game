import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import GameBoard from "./GameBoard";
import { handleData } from "../helpers";

class App extends Component {
  state = {
    staff: []
  };

  componentWillMount = async () => {
    const staff = await handleData();
    this.setState({
      staff
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <GameBoard staff={this.state.staff} />
      </div>
    );
  }
}

export default App;
