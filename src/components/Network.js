import React, { Component } from 'react';

import styles from './Network.module.css';

export default function Network({
  children,
  onLayerUp,
  onLayerDown,
  hiddenLayers,
  addHiddenLayer,
  removeHiddenLayer,
}) {
  const inputLayer = new Array(35).fill(undefined);
  const outputLayer = new Array(7).fill(undefined);
  return (
    <div className={ styles.container }>
      <div className={ styles.labels }>
        <div className={ styles.inputLayer }>Input</div>
        <div className={ styles.hiddenLayers }>
          Hidden Layer
        </div>
        <div className={ styles.outputLayer }>Output</div>
      </div>
      <svg
        className={ styles.canvas }
        width={ 295 }
        height={ 100 }
      >
        { inputLayer.filter(
            (_, index) => index % 5 === 0
          ).map((_, index) => (
          <g key={ index }>
            <line
              key={ index }
              x1={ 40 }
              y1={ 31 }
              x2={ 110 }
              y2={ 18 + (index * 4) }
              stroke={ 'black' }
              strokeWidth={ 0.2 }
            />
            <line
              key={ `${index}_hidden` }
              x1={ 110 }
              y1={ 18 + (index * 4) }
              x2={ 110 + 40 + hiddenLayers.length * 12 }
              y2={ 18 + (index * 4) }
              stroke={ 'black' }
              strokeWidth={ 0.2 }
            />
            <line
              key={ `${index}_output` }
              x1={ 110 + 40 + hiddenLayers.length * 12 }
              y1={ 18 + (index * 4) }
              x2={ 260 }
              y2={ 30 }
              stroke={ 'black' }
              strokeWidth={ 0.2 }
            />
          </g>
        )) }
        <circle key={ 'input' } cx={ 40 } cy={ 30 } fill={ 'gray' } r={ 15 } />
        <text x={ 30 } y={ 71 }>{ inputLayer.length }</text>
        { hiddenLayers.map((neurons, layerIndex) => (
          <g
            key={ layerIndex }
            transform={ 
              `translate(${143 + layerIndex * 35 - ((hiddenLayers.length - 1) * 15)} 0)`
            }>
            <circle
              cx={ 0 }
              cy={ 30 }
              fill={ 'gray' }
              r={ 15 }
              className={ styles.removeLayer }
              onClick={ removeHiddenLayer(layerIndex) }
            />
            <rect x={ -13 } y={ 53 } width={ 12 }
              strokeWidth={ 0 } height={ 12 } fill={ '#bbb' }
              className={ styles.inlineButton }
              onClick={ onLayerUp(layerIndex) }
              key={ 'increaseButton' }
            />
            <rect x={ 2 } y={ 53 } width={ 12 }
              strokeWidth={ 0 } height={ 12 } fill={ '#bbb' }
              className={ styles.inlineButton }
              onClick={ onLayerDown(layerIndex) }
              key={ 'decreaseButton' }
            />
            <text key={ 'neurons' }
               textAnchor="middle"
               x={ -1 } y={ 90 }>{ neurons }</text>
            <text x={ -11 } y={ 64 }
              key={ 'up' }
              className={ styles.inlineButton }>+</text>
            <text key={ 'down' } x={ 6 } y={ 63 }
              className={ styles.inlineButton }>-</text>
          </g>
        )) }
        <circle
          key={ 'output' }
          cx={ 255 }
          cy={ 30 }
          fill={ 'gray' }
          r={ 15 } />
        <text x={ 255 } y={ 71 }>{ outputLayer.length }</text>
      </svg>
    </div>
  );
}
