import { Architect } from 'synaptic';

import {
  NORMALIZED_NONE,
  NORMALIZATION_MAP,
} from '../constants'; 

let network;

export const input = (grammar, index, memory = 5) => {
  const { slice } = Array.prototype;
  const prev = index - memory;
  const partition = slice.call(
    grammar,
    prev > 0 ? prev : 0,
    index
  );

  const base = (
    partition.length >= memory
      ? []
      : (
        new Array(
          memory - partition.length
        ).fill(
          NORMALIZED_NONE
        )
      )
  );

  return (
    base.concat(
      partition
    ).map(
      value => NORMALIZATION_MAP[value]
    ).reduce(
      (a, b) => a.concat(b)
    )
  );
}

export const train = (grammar, hiddenLayers, memory = 5) => {
  network = new Architect.Perceptron(
    35,  // input layer
    ...hiddenLayers,
    7    // output layer
  );

  const { map, slice } = Array.prototype;

  const trainingSet = map.call(
    grammar,
    (command, index) => [
      input(grammar, index, memory),
      NORMALIZATION_MAP[command]
    ]
  );

  network.clear();

  network.trainer.train(
    trainingSet.map(
      ([input, output]) => ({ input, output })
    ),
    {
      rate: 0.1,
      iterations: 300,
      error: .0001,
    }
  );
};

export const activate = (
  size = 500,
  initial = Array.from('FFF')
) => (
  new Array(
    size
  ).fill(
    undefined
  ).reduce(
    (prev, _, index) => {
      const inputLayer = input(prev, index);
      const outputLayer = network.activate(inputLayer);
      console.log(outputLayer);
      const next = Object.keys(NORMALIZATION_MAP)[
        outputLayer.indexOf(
          Math.max.apply(Math, outputLayer)
        ) + 1
      ];


      return (
        next === NORMALIZED_NONE
         ? prev
         : [...prev, next]
      );
    },
    initial
  )
);
