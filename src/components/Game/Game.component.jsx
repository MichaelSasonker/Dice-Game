import React from 'react';
import Dice from "../Dice/Dice.component";
import Button from "../Button/Button.component";
import ScoreBoard from "../ScoreBoard/ScoreBoard.component";
import CurrentPlayer from "../CurrentPlayer/CurrentPlayer.component";
import Input from "../Input/Input.component";
import "./game.css";

let counter = 100;

class Game extends React.Component {

  state = {
    gameState: -1,
    currentPlayerIndex: 0,
    players: [],
    currentScore: 0,
    dices: [1, 1],
    targetScore: 100,
    input: { players: "Player 1,Player 2", targetScore: "100" },
    winner: "",
  };

  rollTheDice = () => {
    this.setState({ dices: this.state.dices.map(
      (dice) => Math.floor(Math.random() * 6) + 1) }, 
      this.checkDices
      );
  };

  checkDices = () => {
    if (this.state.dices.filter((dice) => dice === 6).length === this.state.dices.length) {
      this.setState((prevState) => {
        return( 
          prevState.currentPlayerIndex + 1 === prevState.players.length
          ? { currentPlayerIndex: 0, currentScore: 0 }
          : { currentPlayerIndex: prevState.currentPlayerIndex + 1, currentScore: 0 }
        );
      });
    } else {
      this.setState((prevState) => {
        return { currentScore: prevState.currentScore + prevState.dices.reduce((acc, dice) => acc + dice) };
      });
    }
  };

  drawTheDices = () => {
    return (
      <div className="dices">
        {this.state.dices.map((dice) => (
          <Dice key={counter++} diceValue={dice} />
        ))}
      </div>
    );
  };

  hold = () => {
    this.setState(
      (prevState) => ({
        players: prevState.players.map((player, index) =>
          index === prevState.currentPlayerIndex
            ? { name: player.name, totalScore: player.totalScore + prevState.currentScore, wins: player.wins }
            : { name: player.name, totalScore: player.totalScore, wins: player.wins }
        ),
      }),
      () => {
        const indexWinner = this.state.players.findIndex((player) => player.totalScore >= this.state.targetScore);
        if (indexWinner > -1) {
          this.setState((prevState) => ({
            gameState: 1,
            winner: this.state.players[indexWinner],
            players: prevState.players.map((player, index) =>
              index === indexWinner
                ? { name: player.name, totalScore: player.totalScore, wins: player.wins + 1 }
                : { name: player.name, totalScore: player.totalScore, wins: player.wins }
            ),
          }));
        }
      }
    );
    this.setState((prevState) => {
      return ( 
        prevState.currentPlayerIndex + 1 === prevState.players.length
        ? {
            currentPlayerIndex: 0,
            currentScore: 0,
          }
        : {
            currentPlayerIndex: prevState.currentPlayerIndex + 1,
            currentScore: 0,
          }
      );
    });
  };

  resetGame = () => {
    this.setState({
      gameState: -1,
      currentPlayerIndex: 0,
      players: [],
      currentScore: 0,
      dices: [1, 1],
      targetScore: 100,
      input: { players: "Player 1,Player 2", targetScore: "100" },
      winner: "",
    });
  };

  handleInputChange = (e) => {
    this.setState((prevState) => {
      const input = prevState.input;
      input[e.target.name] = e.target.value;
      return { input };
    });
  };

  startGame = () => {
    this.setState((prevState) => {
      const playersNames = ['Player 1', 'Player 2'];
      let targetScore = parseInt(prevState.input.targetScore);
      if (targetScore < 10 || !targetScore) {
        targetScore = 100;
      }

      const players = playersNames.map((player) => ({ name: player, totalScore: 0, wins: 0 }));
      return ({ players, targetScore, gameState: 0 });
    });
  };

  newRound = () => {
    this.setState((prevState) => ({
      gameState: 0,
      players: prevState.players.map((player) => ({ name: player.name, totalScore: 0, wins: player.wins })),
    }));
  };

  drawGame = () => {
    switch (this.state.gameState) {
      case -1:
        // Starter screen
        return (
          <div className="game game-welcome">
            <h1>
             Dice Game!
            </h1>
     
            <div className="input-cont">
              <Input
                key='targetScore'
                name="targetScore"
                id="targetScare"
                input={this.state.input.targetScore}
                handleInputChange={this.handleInputChange}
                type="number"
                label="Target score: "
              />
            </div>
            <div className="buttons-cont">
              <Button key='play' handleButtonClick={this.startGame} text="Play" />
            </div>
          </div>
        );

      case 0:
        // While playing
        return (
          <div className="game">
            <ScoreBoard
              key='scoreBoard'
              currentPlayerIndex={this.state.currentPlayerIndex}
              players={this.state.players}
              targetScore={this.state.targetScore}
              />
            {this.drawTheDices()}
            <CurrentPlayer 
              key='currnetPlayer'
              player={this.state.players[this.state.currentPlayerIndex]} 
              currentScore={this.state.currentScore} 
            />
            <div className="buttons-cont">
              <Button key='rollDice' handleButtonClick={this.rollTheDice} text="Roll the dice" />
              <Button key='hold' handleButtonClick={this.hold} text="Hold" />
              <Button key='newGame' handleButtonClick={this.resetGame} text="New Game" />
            </div>
          </div>
        );
      case 1:
        // Someone won
        return (
          <div className="game game-win">
            <h1>
              {this.state.winner.name} win!
            </h1>
            <div className="intro">
              <h3>Play Again?</h3>
            </div>
            <div className="buttons-cont">
              <Button key='newRound' handleButtonClick={this.newRound} text="New Round" />
            </div>
          </div>
        );

      default:
        break;
    }
  };

  render() {
    return (
      <div key='startGame' className="game-wrapper">
        {this.drawGame()}
      </div>
    );
  }
}

export default Game;
