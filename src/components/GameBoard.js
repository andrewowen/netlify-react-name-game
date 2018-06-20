import React from "react";
import "./GameBoard.css";
import EmployeeTile from "./EmployeeTile";

class GameBoard extends React.Component {
  state = {
    selectedEmployees: [],
    lastFlipped: "",
    currentlyFlipped: "",
    numFlipped: 0
  };

  handleFlip = (details, key) => {
    if (this.state.lastFlipped === "") {
      this.setState({
        lastFlipped: details.firstName
      });
    }
    if (this.state.lastFlipped !== "") {
      this.setState({
        lastFlipped: this.state.currentlyFlipped
      });
    }
    if (this.state.selectedEmployees.includes(key)) {
      const newSelectedEmployees = [...this.state.selectedEmployees].filter(
        foo => foo !== key
      );
      const newNumFlipped = this.state.numFlipped - 1;
      this.setState({
        selectedEmployees: newSelectedEmployees,
        currentlyFlipped: details.firstName,
        numFlipped: newNumFlipped
      });
      console.log(this.state.selectedEmployees.length);
    } else {
      const selectedEmployees = [...this.state.selectedEmployees, key];
      this.setState(
        prevState => {
          return {
            selectedEmployees,
            currentlyFlipped: details.firstName,
            numFlipped: prevState.numFlipped + 1
          };
        },
        () => {
          console.log(this.state.numFlipped);
        }
      );
    }
  };

  handleMatch = (lastFlipped, currentlyFlipped) => {
    if (lastFlipped !== currentlyFlipped) {
      this.setState({
        selectedEmployees: [],
        lastFlipped: "",
        currentlyFlipped: ""
      });
    }
  };

  resetFlipCounter = () => {
    this.setState({
      numFlipped: 0
    });
  };

  render() {
    return (
      <div className="game-board-container">
        {Object.keys(this.props.staff).map(key => (
          <EmployeeTile
            key={key}
            staffKey={key}
            details={this.props.staff[key]}
            isFlipped={this.state.selectedEmployees.indexOf(key) >= 0}
            handleFlip={this.handleFlip}
            handleFlipBack={this.handleFlipBack}
          />
        ))}
      </div>
    );
  }
}

export default GameBoard;
