import React, { Component } from 'react';
import './board.css';

class Board extends Component {

  constructor(props){
    super(props)
    this.state = {
      board : Array(9).fill(null),
      player: "X",
      winner: null
    }
  }

  getWinLines() {
    return [
      ["0","1","2"],
      ["3","4","5"],
      ["6","7","8"],
      ["0","3","6"],
      ["1","4","7"],
      ["2","5","8"],
      ["0","4","8"],
      ["2","4","6"],
    ]
  }

  checkWinner() {
    const winLines = this.getWinLines();
    for (let index = 0; index < winLines.length; index++) {
      const [a, b, c] = winLines[index];
      if(this.state.board[a] && this.state.board[a] === this.state.board[b] && this.state.board[a] === this.state.board[c]) {
        alert('You won');
        this.setState({ winner: this.state.player }, () => {
          //alert(this.state.player === 'X' ? 'You won' ! 'You loose');
        })
      }
    }
  }

  chooseAutomaticBox() {
    const winLines = this.getWinLines();
    let boxToFill;

    for (let index = 0; index < winLines.length; index++) {
      const [a, b, c] = winLines[index];
      if(this.state.board[a] && this.state.board[a] === this.state.board[b] && this.state.board[c] === null) {
        boxToFill = c;
        break;
      } 
      if(this.state.board[a] && this.state.board[a] === this.state.board[c] && this.state.board[b] === null) {
        boxToFill = b;
        break;
      }
      if(this.state.board[b] && this.state.board[b] === this.state.board[c] && this.state.board[a] === null) {
        boxToFill = a;
        break;
      }
      else {
        let emptyBoxes = [];
        this.state.board.forEach((box, index) => {
          if(!box) {
            emptyBoxes.push(index);
          }
        });
        boxToFill = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
      }
    }
    this.fillBox(boxToFill);
    this.setState({
      player: "X"
    });
  }

  fillBox(index) {
    let updatedBoard = this.state.board
    if(this.state.board[index] === null && !this.state.winner) {
      updatedBoard[index] = this.state.player
      this.setState(
      {
        board: updatedBoard,
      })
      this.checkWinner()
    }
  }

  handleClick(index) {
    this.fillBox(index);
    this.setState({player: "O"}, () => {
      setTimeout(this.chooseAutomaticBox(), 2000);
    }); 
  }

  render() {
    const box = this.state.board.map((box, index) => <div className="Box" key={index} onClick={() => this.handleClick(index)}>{box}</div>)
    return (
      <div className="Board">
        {box}
      </div>
    );
  }
}

export default Board;