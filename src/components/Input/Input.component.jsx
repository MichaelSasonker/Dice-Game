import React from 'react';
import "./input.css";

class Input extends React.Component {

  render() {
    return (
      <label htmlFor={this.props.id}>
        {this.props.label}
        <input
          type={this.props.type}
          id={this.props.id}
          min={this.props.type === "number" ? "10" : undefined}
          name={this.props.name}
          value={this.props.input}
          onChange={this.props.handleInputChange}
        />
      </label>
    );
  }
}

export default Input;
