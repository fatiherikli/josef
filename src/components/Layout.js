import React, { Component } from 'react';

import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={ styles.container }>
      <header>
        <h1>Josef</h1>
        <h3>A robot who tries to learn how to draw</h3>
      </header>
      { children }
      <div className={ styles.about }>
        <h1><span>Who is Josef</span></h1>
        <p>Josef is feedforward neural network based on synapticjs and distant relative of Istanbul's famous robot
        poet <a href="https://vimeo.com/161035144">Deniz Yilmaz</a>.</p>
        <h1><span>How does it work</span></h1>
        <p>The network tries to predict next action of the drawing grammar. Works like
        an Lindenmayer interpreter running by a neural network which is a non-deterministic 
        way to evaluate that kind of self-rewriting systems.</p>
        <p>The network has 35 inputs consist the last 5 operations of the grammar
        and 7 output variables
        that represents a single action character.</p>
        <h1><span>Future Improvements</span></h1>
        <p>It's working on a classification based model. It's possible to draw it
        by regression values, but I've never tried it. If you want
        to improve or restructure it in a different way, please don't hesitate
        to send a pull request on <a href="http://github.com/fatiherikli/josef">github</a>.</p>
      </div>
      <footer>
        <a href="http://fatiherikli.com">Fatih Erikli</a> - MIT
        Licensed - 2017
      </footer>
    </div>
  );
}
