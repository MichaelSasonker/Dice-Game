import React from 'react';
import "./button.css";

class Button extends React.Component {
  
  render() {
    return (
      <button onClick={this.props.handleButtonClick}>
          {this.props.text}
      </button>
    );
  }
}

export default Button;
