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

export class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBlackSquareModeToggle() {
    this.props.actions.toggleBlackSquareMode()
  }

  render() {
    return (
      <div>
        <ToggleButton onToggle={this.handleBlackSquareModeToggle.bind(this)}
                      text="Edit Black Squares"
                      name="black-squares"
                      status={this.props.settings.blackSquareMode} />
      </div>
    )
  }
}

export class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className={"toggle-button " + this.props.name + (this.props.status ? " on" : "")}
              onClick={this.props.onToggle} >{this.props.text}</button>
    )
  }
}