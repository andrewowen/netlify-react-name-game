import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import { shuffle, fetchData } from '../helpers';

class App extends Component {
  state = {
    currentScore: 0,
    shuffledStaff: [],
    currentEmployees: [],
    matchedEmployees: [],
    isLoaded: false
  };

  staff = [];

  increaseScore = () => {
    this.setState(
      prevState => {
        return {
          currentScore: prevState.currentScore + 1
        };
      },
      newScore => {
        sessionStorage.setItem('currentScore', this.state.currentScore);
      }
    );
  };

  resetScore = () => {
    this.setState(
      {
        currentScore: 0,
        matchedEmployees: [],
        currentEmployees: []
      },
      () => {
        this.shuffleStaff();
        sessionStorage.setItem('currentScore', 0);
      }
    );
  };

  shuffleStaff = () => {
    // grab SIX random employees from the array of total employees
    let sixRandomEmployees = shuffle(this.staff)
      .slice(0, 6)
      // and map them twice into a multi-dimensional array
      .map(element => {
        return [element, element];
      })
      // and flatten it
      .reduce((acc, val) => acc.concat(val), []);
    // shuffle the new array once more to get rid of pairs
    const shuffledStaff = shuffle(sixRandomEmployees);
    this.setState({
      shuffledStaff
    });
  };

  getNumFlipped = () => {
    return this.state.currentEmployees.length;
  };

  handleFlip = (details, key) => {
    const { currentEmployees } = this.state;
    console.log('clicked!');
    // flip tile
    this.setState(
      {
        currentEmployees: [...currentEmployees, key]
      },
      () => {
        if (this.getNumFlipped() === 2) {
          setTimeout(() => {
            this.handleMatch(details, key);
          }, 1000);
        }
      }
    );
  };

  handleMatch = (details, key) => {
    const { shuffledStaff, currentEmployees, matchedEmployees } = this.state;
    const lastFlipped = shuffledStaff[currentEmployees[0]];
    const currentlyFlipped = shuffledStaff[currentEmployees[1]];
    const isMatch = lastFlipped.id === currentlyFlipped.id;

    // if they match
    if (isMatch) {
      console.log(`You found ${details.firstName} ${details.lastName}`);
      // add currently selected employees to matched employees array
      this.setState(
        {
          matchedEmployees: [...matchedEmployees, ...currentEmployees],
          currentEmployees: []
        },
        // then check if all employees have been matched and if so reset the board
        () => {
          this.increaseScore();
          if (
            this.state.matchedEmployees.length ===
            this.state.shuffledStaff.length
          ) {
            this.handleBoardReset();
          }
        }
      );
    }
    // if they do not, reset array of currently selected employees
    else {
      console.log('Try again!');
      this.setState(
        {
          currentEmployees: []
        },
        () => {}
      );
    }
  };

  handleBoardReset = () => {
    this.setState(
      {
        matchedEmployees: [],
        currentEmployees: []
      },
      this.shuffleStaff
    );
  };

  componentDidMount = async () => {
    const staff = await fetchData(
      'https://willowtreeapps.com/api/v1.0/profiles'
    );
    this.staff = staff;
    this.shuffleStaff();
    const sessionStorageRef = sessionStorage.getItem('currentScore');
    if (sessionStorageRef) {
      this.setState({
        currentScore: parseInt(sessionStorageRef, 10),
        isLoaded: true
      });
    }
    this.setState({
      isLoaded: true
    });
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="container">
          <Header
            currentScore={this.state.currentScore}
            resetScore={this.resetScore}
          />
          <GameBoard
            increaseScore={this.increaseScore}
            getNumFlipped={this.getNumFlipped}
            shuffledStaff={this.state.shuffledStaff}
            matchedEmployees={this.state.matchedEmployees}
            currentEmployees={this.state.currentEmployees}
            handleFlip={this.handleFlip}
          />
        </div>
      );
    }
    return <div className="app-loading">Loading...</div>;
  }
}

export default App;
