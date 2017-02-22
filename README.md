### Josef

Producing artworks by artificial neural networks.

![demo](https://raw.githubusercontent.com/fatiherikli/josef/master/static/new-demo.gif?kurwacache3)

#### Who is Josef

Josef is feedforward neural network based on synapticjs and a distant relative of Istanbul's famous robot poet [Deniz Yilmaz](https://vimeo.com/161035144).

#### How does it work
The network tries to predict next action of the drawing grammar. Works like an Lindenmayer interpreter running by a neural network which is a non-deterministic way to evaluate that kind of self-rewriting systems.

The network has 35 inputs consist the last 5 operations of the grammar and 7 output variables that represents a single action character.

#### Future Improvements
It's working on a classification based model. It's possible to draw it by regression values, but I've never tried it. If you want to improve or restructure it in a different way, please don't hesitate to send a pull request.

