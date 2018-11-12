import React, { Component } from 'react';
import './App.css';
import Board from './components/board';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    );
  }
}

export default App;
