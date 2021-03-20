import React from 'react';
import "./dice.css";

class Dice extends React.Component {

  render() {
    return (
      <div className={`dice dice-${this.props.diceValue}`}></div>
    );
  }
}

export default Dice;
