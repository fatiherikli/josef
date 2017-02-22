import React, { Component } from 'react';

import styles from './Options.module.css';
import Network from './Network';

const preventDefault = callback => event => (
  event.preventDefault(),
  callback()
);

export default function Options({
  onApply,
  onUpdateGrammar,
  grammar,
  ...props
}) {
  return (
    <div className={ styles.container }>
      <div className={ styles.section }>
        <h3>Baby Steps</h3>
        <p>Let's start with teaching baby steps to our neural network.</p>
        <textarea
          value={ grammar }
          onChange={ onUpdateGrammar }
          className={ styles.grammar }
        />
        <button
          onClick={ preventDefault(onApply) }
          className={ styles.drawButton }
        >Train & Draw</button>
      </div>
      <div className={ styles.section }>
        <h3>Grammar</h3>
        <ul>
          <li>
            <strong><span>F</span></strong>Go forward and draw a line</li>
          <li><strong><span>+</span><span>-</span></strong> 
            Turn 30 degree to the right/left</li>
          <li><strong><span>{'['}</span><span>{']'}</span></strong> 
            Save/restore current position</li>
          <li><strong><span>L</span></strong>Leave a small red box in current position</li>
        </ul>
      </div>
      <div className={ styles.section }>
        <h3>Network Options</h3>
        <Network { ...props } />
      </div>
    </div>
  );
}
