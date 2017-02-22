import React, { Component } from 'react';
import { Architect } from 'synaptic';

import { toRadian } from './utils';
import { PROGRAM_DELIMITER } from './constants';
import { train, activate } from './perceptron';

import Layout from './components/Layout';
import Canvas from './components/Canvas';
import Options from './components/Options';


export default class Container extends Component {
  constructor(props, context) {
    super(props, context);

    this.generate = this.generate.bind(this);
    this.updateGrammar = this.updateGrammar.bind(this);
    this.increaseNeurons = this.increaseNeurons.bind(this);
    this.decreaseNeurons = this.decreaseNeurons.bind(this);
    this.addHiddenLayer = this.addHiddenLayer.bind(this);
    this.removeHiddenLayer = this.removeHiddenLayer.bind(this);

    this.state = {
      grammar: 'FFF[+FL][-FL]F',
      commands: 'F[+F][-F]',
      hiddenLayers: [17],
    };
  }

  componentDidMount() {
    this.generate();
  }

  updateGrammar({ target: { value: grammar } }) {
    this.setState({
      grammar,
    });
  }

  increaseNeurons(layerIndex) {
    return (event) => {
      const { hiddenLayers } = this.state;
      this.setState({
        hiddenLayers: hiddenLayers.map(
          (neurons, index) => (
            index === layerIndex ? neurons + 1 : neurons
          )
        )
      });
    }
  }

  addHiddenLayer(event) {
    event.preventDefault();
    const { hiddenLayers } = this.state;
    this.setState({
      hiddenLayers: [...hiddenLayers, 10],
    });
  }

  removeHiddenLayer(layerIndex) {
    return (event) => {
      const { hiddenLayers } = this.state;
      this.setState({
        hiddenLayers: hiddenLayers.filter(
          (_, index) => (
            index !== layerIndex ||
            layerIndex === 0
          )
        )
      });
    }
  }

  decreaseNeurons(layerIndex) {
    return (event) => {
      const { hiddenLayers } = this.state;
      this.setState({
        hiddenLayers: hiddenLayers.map(
          (neurons, index) => (
            index === layerIndex ? neurons -1 : neurons
          )
        )
      });
    }
  }

  generate() {
    const {
      commands: prevState,
      grammar,
      hiddenLayers,
    } = this.state;

    train(grammar, hiddenLayers);

    const commands = activate(
      150
    ).join(
      PROGRAM_DELIMITER
    );
    console.log(commands)

    this.setState({
      commands,
    });
  }

  render() {
    const { commands, grammar, hiddenLayers } = this.state;

    return (
      <Layout>
        <Options
          onApply={ this.generate }
          grammar={ grammar }
          onUpdateGrammar={ this.updateGrammar }
          onLayerUp={ this.increaseNeurons }
          onLayerDown={ this.decreaseNeurons }
          hiddenLayers={ hiddenLayers }
          addHiddenLayer={ this.addHiddenLayer }
          removeHiddenLayer={ this.removeHiddenLayer }
        />
        <Canvas
          commands={ commands }
        />
      </Layout>
    );
  }
}
