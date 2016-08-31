// this will be split up later!

import React from 'react';

export class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = 5;
    const height = width;
    let grid = Array.apply(null, { length: width }).map(e => Array.apply(null, { length: height }));
    return (
      <table id="crosswordGrid">
        <tbody>
          {grid.map((row, i) => <tr key={i}>{row.map((el,j)=><td class="crosswordSquare" key={j}><CrosswordSquare row={i} col={j} /></td>)}</tr>)}
        </tbody>
      </table>
    );
  }
}

export class CrosswordSquare extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <input type="text" value={this.props.row + ", " + this.props.col} />
    );
  }
}