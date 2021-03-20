import React from 'react';
import "./currentPlayer.css";

class CurrentPlayer extends React.Component {
  

  render() {
    return (
      <div className="current-player">
        <h2>{this.props.player.name}</h2>
        <div className="current-player-stats">
          <div>
            Current score: {this.props.currentScore}
            </div>
          <div>
            Total score: {this.props.player.totalScore} 
          </div>
          <div>
            Total score Without holding: {this.props.player.totalScore + this.props.currentScore}
          </div>
          <div>
            Won rounds: {this.props.player.wins}
            </div>
        </div>
      </div>
    );  
  }
}

export default CurrentPlayer;
