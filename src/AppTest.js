import React from "react";

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  // Add handleChange() and submitMessage() methods here
  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  submitMessage() {
    const newMessage = this.state.input;
    this.setState((prevState) => ({
      messages: [newMessage, ...prevState.messages],
    }));
    this.setState({
      input: "",
    });
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        {/* Render an input, button, and ul below this line */}
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />

        <button type="button" onClick={this.submitMessage}>
          Add message
        </button>
        <ul>
          {this.state.messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>

        {/* Change code above this line */}
      </div>
    );
  }
}

export default DisplayMessages;
