// this will be split up later!

import React from 'react';

export default class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // just making a multidimensional array
    this.state.squares = Array.apply(null, { length: this.props.width })
      .map( (e, row) => Array.apply(null, { length: this.props.height })
        .map((square, col) => ({row, col, id: row * this.props.width + col, solution: null}))
      );
    console.log(this.state.squares.reduce((a,b) => a.concat(b)));
  }

  render() {
    return (
      <table id="crosswordGrid">
        <tbody>
          {this.state.squares.map((row, i) => <tr key={i}>{row.map((square,j)=><td className="crosswordSquare" key={j}><CrosswordSquare row={square.row} col={square.col} /></td>)}</tr>)}
        </tbody>
      </table>
    );
  }
}
CrosswordGrid.defaultProps = {width: 5, height: 5};

export class CrosswordSquare extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <input type="text" value={this.props.col + ", " + this.props.row} />
    );
  }
}