import React, { Component } from 'react';

import { noop, toRadian } from '../utils';
import styles from './Canvas.module.css';

export default class Canvas extends Component {
  componentDidUpdate(prevProps) {
    const { commands } = this.props;
    if (commands !== prevProps.commands) {
      this.drawByCommands(commands);
    };
  }

  moveTo(context, distance, angle) {
    context.moveTo(0, 0);
    context.lineTo(0, distance);
    context.translate(0, distance);
  }

  rotateCW(context, distance, angle) {
    context.rotate(toRadian(angle));
  }

  rotateCCW(context, distance, angle) {
    context.rotate(toRadian(-angle));
  }

  shape(context) {
    context.stroke();
    context.strokeWidth = 0;
    context.rect(0, 0, 4, 4);
    context.fillStyle = 'red';
    context.fill();
    context.beginPath();
  }

  pushMatrix(context) {
    context.save();
  }

  popMatrix(context) {
    context.restore();
    context.stroke();
  }

  clear(canvas, context) {
    const { width, height } = this.props;
    canvas.width = width;
    canvas.height = height;
    context.translate(width / 2, height / 1.02);
    context.scale(-3.5, -3.5);
  }

  drawByCommands(commands) {
    const { canvas } = this.refs;
    const { forEach, map } = Array.prototype;
    const context = canvas.getContext('2d');
    const distance = 10;
    const angle = 30;

    const notFound = (context, distance, angle, command) => {
      console.log('Unknown command: ', command);
    };

    const mapping = {
      'F': this.moveTo,
      'L': this.shape,
      '+': this.rotateCW,
      '-': this.rotateCCW,
      '[': this.pushMatrix,
      ']': this.popMatrix,
      ',': noop,
    }

    this.clear(canvas, context);

    let instructions = map.call(
      commands,
      action => () => (mapping[action] || mapping.notFound)(
        context, distance, angle, action
      )
    );

    const draw = () => {
      const callable = instructions.pop();

      if (callable) {
        callable();
        context.stroke();
      } else {
        return;
      }

      requestAnimationFrame(draw);
    };

    draw();
  }

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        ref={ 'canvas' }
        width={ width }
        height={ height }
        className={ styles.canvas }
        style={{
          width: width / 2,
          height: height / 2
        }}
      />
    );
  }
}

Canvas.defaultProps = {
  width: 900,
  height: 1258,
};
