// this will be split up later!

import React from 'react';

export default class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table id="crossword-grid">
        <tbody>
          {this.props.squares.map((row, i) => <tr key={i}>{row.map((square,j)=><td className="crossword-square" key={j}><CrosswordSquare row={square.row} col={square.col} clueNumber={square.clueNumber} solution={square.solution} /></td>)}</tr>)}
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
      <div>
        <div className="clue-number-wrapper">
          <div className="clue-number">{this.props.clueNumber}</div>
        </div>
        <input type="text" value={this.props.solution} />
      </div>
    );
  }
}