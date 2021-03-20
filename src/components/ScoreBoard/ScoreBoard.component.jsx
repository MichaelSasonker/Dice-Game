import React from 'react';
import "./scoreBoard.css";

class ScoreBoard extends React.Component {


  render() {
    return (
      <ul className="scoreboard">
        <li key='target' className="target-score">
          <h3>Target Score: {this.props.targetScore}</h3>
        </li>
        <li key='scores' className="players-score">
          {this.props.players
            .filter((player, index) => index !== this.props.currentPlayerIndex)
            .map((player) => {
              return (
                <div key='score' className="player-score">
                  <h4>{player.name}</h4>
                  <div>Total Score: {player.totalScore}</div>
                  <div>Won rounds: {player.wins}</div>
                </div>
              );
            })}
        </li>
      </ul>
    );
  }
}
//   render() {
//     return (
//       <ul className="scoreboard">
//         <li key='target' className="target-score">
//           <h3>Target Score: {this.props.targetScore}</h3>
//         </li>
//         <li key='scores' className="players-score">
//           {this.props.players
//             .filter((player, index) => index !== this.props.currentPlayerIndex)
//             .map((player) => {
//               return (
//                 <li key='score' className="player-score">
//                   <h4>{player.name}</h4>
//                   <div>Total Score: {player.totalScore}</div>
//                   <div>Won rounds: {player.wins}</div>
//                 </li>
//               );
//             })}
//         </li>
//       </ul>
//     );
//   }
// }

export default ScoreBoard;
