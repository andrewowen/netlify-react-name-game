import React from 'react';
import './GameBoard.css';
import EmployeeTile from './EmployeeTile';
import { fetchData, shuffle } from '../helpers';

class GameBoard extends React.Component {
  state = {
    staff: [],
    shuffledStaff: [],
    matchedEmployees: [],
    lastFlipped: '',
    currentlyFlipped: '',
    numFlipped: 0,
    readyToClick: true
  };

  handleFlip = (details, key) => {
    console.log('clicked!');
    // flip tile
    const matchedEmployees = [...this.state.matchedEmployees, key];
    // if this is the first time the game has been started, 
    // set last flipped tile to the currently selected tile.
    if (this.state.lastFlipped === '') {
      this.setState({
        lastFlipped: `${details.firstName} ${details.lastName}`
      });
    }
    this.setState(
      prevState => {
        return {
          matchedEmployees,
          currentlyFlipped: `${details.firstName} ${details.lastName}`,
          lastFlipped: prevState.lastFlipped,
          numFlipped: prevState.numFlipped + 1
        };
      },
      () => {
        if (this.state.numFlipped >= 2) {
          this.setState(
            {
              readyToClick: false
            },
            () => {
              setTimeout(() => {
                this.handleMatch(details, key);
              }, 1000);
            }
          );
        }
      }
    );
  };

  handleMatch = (details, key) => {
    const { matchedEmployees, currentlyFlipped, lastFlipped } = this.state;
    // check if tiles match
    // if they do, keep employees in matched array
    if (currentlyFlipped === lastFlipped) {
      console.log(`You found ${details.firstName} ${details.lastName}`);
    }
    // if they do not, remove the last two from the array (the last employees added)
    else {
      console.log('Try again!');
      this.setState(prevState => {
        const employees = [...matchedEmployees];
        employees.splice(-2);
        return {
          matchedEmployees: employees
        };
      });
    }
    // In both cases, last flipped tile and num of tiles flipped should be reset
    // and other tiles should be clickable again.
    this.setState({
      lastFlipped: '',
      numFlipped: 0,
      readyToClick: true
    });
  };

  shuffleStaff = () => {
    let sixRandomEmployees = shuffle(this.state.staff)
      .slice(0, 6)
      .map(element => {
        return [element, element];
      })
      .reduce((acc, val) => acc.concat(val), []);
    const shuffledStaff = shuffle(sixRandomEmployees);
    this.setState({
      shuffledStaff
    });
  };

  componentDidMount = async () => {
    const staff = await fetchData(
      'https://willowtreeapps.com/api/v1.0/profiles'
    );
    this.setState(
      {
        staff
      },
      this.shuffleStaff
    );
  };

  render() {
    return (
      <div className="game-board-container">
        {Object.keys(this.state.shuffledStaff).map((key, details) => (
          <EmployeeTile
            key={key}
            staffKey={key}
            details={this.state.shuffledStaff[key]}
            isFlipped={this.state.matchedEmployees.includes(key)}
            handleFlip={this.handleFlip}
            handleFlipBack={this.handleFlipBack}
            readyToClick={this.state.readyToClick}
          />
        ))}
        <button onClick={this.shuffleEmployees}>CLick</button>
      </div>
    );
  }
}

export default GameBoard;
