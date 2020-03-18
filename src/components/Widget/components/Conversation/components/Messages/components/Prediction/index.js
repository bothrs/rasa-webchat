import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';

import useDebounce from '../../../../../../../../../hooks/debounce';

const { TransitionGroup, CSSTransition } = require('react-transition-group');

const Prediction = ({ text, send }) => {
  const [predictions, setPredictions] = useState([]);

  const debouncedValue = useDebounce(text, 100);

  const handleSend = (event, value) => {
    send(event, value);
    setPredictions([]);
  };

  useEffect(() => {
    async function getPredictions(txt) {
      const response = await fetch(`https://chatbotgent.glitch.me/intents?q=${encodeURI(txt)}`, {
        method: 'GET'
      });
      const { intents } = await response.json();
      setPredictions(
        intents.filter(int => parseFloat(int.score) >= 0.1 && int.intent !== 'None') || []
      );
    }
    getPredictions(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="prediction-container">
      <TransitionGroup >
        {predictions.length ? (
          predictions.map(pr => (
            <CSSTransition key={pr.intent} timeout={100} classNames="item">
              <button onClick={e => handleSend(e, pr.intent)}>
                {pr.intent}
              </button>
            </CSSTransition>
          ))
        ) : (
          <div />
        )}
      </TransitionGroup>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Prediction);

Prediction.propTypes = {
  text: PropTypes.string,
  send: PropTypes.func
};

Prediction.defaultTypes = {
  text: ''
};
