import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import send from 'assets/send_button.svg';
import './style.scss';
import Prediction from '../Messages/components/Prediction';

const Sender = ({ sendMessage, inputTextFieldHint, disabledInput, userInput }) => {
  const [input, setInput] = useState(userInput);

  const handlePredictionSubmit = (e, value) => {
    e.preventDefault();
    // e.target.message.value = e.target.value;
    sendMessage({
      preventDefault: e.preventDefault,
      target: {
        message: {
          value
        }
      }
    });
    setInput('');
  };

  return userInput === 'hide' ? (
    <div />
  ) : (
    <div className="sender-container">
      <Prediction text={input} send={handlePredictionSubmit} />
      <form className="sender" onSubmit={sendMessage}>
        <input
          type="text"
          className="new-message"
          name="message"
          placeholder={inputTextFieldHint}
          disabled={disabledInput || userInput === 'disable'}
          autoFocus
          autoComplete="off"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="send">
          <img src={send} className="send-icon" alt="send" />
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  inputTextFieldHint: state.behavior.get('inputTextFieldHint'),
  userInput: state.metadata.get('userInput')
});

Sender.propTypes = {
  sendMessage: PropTypes.func,
  inputTextFieldHint: PropTypes.string,
  disabledInput: PropTypes.bool,
  userInput: PropTypes.string
};

export default connect(mapStateToProps)(Sender);
