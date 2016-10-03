// this will be split up later!

import React from 'react'

export default class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props)
  }

  isBlackSquareMode() {
    return this.props.settings.blackSquareMode
  }

  render() {
    return (
      <table id="crossword-grid" className={this.props.settings.blackSquareMode ? "black-square-mode" : null}>
        <tbody>
          {this.props.squares.map((row, i) => <tr key={i}>{row.map((square,j)=>
            <td className="crossword-square" key={j}>
              <CrosswordSquare
                row={square.row}
                col={square.col}
                clueNumber={square.clueNumber}
                solution={square.solution}
                enabled={square.enabled}
                isBlackSquareMode={this.isBlackSquareMode.bind(this)}
                toggleBlackSquare={this.props.actions.toggleBlackSquare}
              />
              </td>)}
          </tr>)}
        </tbody>
      </table>
    )
  }
}

export class CrosswordSquare extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
  }

  handleBlackClick(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.toggleBlackSquare(this.props.row, this.props.col)
  }

  render() {
    // temporarily very wet

    if (this.props.isBlackSquareMode()) {
      return (
          <div onClick={this.handleBlackClick.bind(this)} className={(!this.props.enabled ? "black" : "white") + " square-wrapper"} >
            <div className="clue-number-wrapper">
              <div className="clue-number">{this.props.clueNumber}</div>
            </div>
            <div className="square">{this.props.solution}</div>
          </div>
      )
    }
    else {
      return (
        <div onClick={this.handleClick.bind(this)} className={(!this.props.enabled ? "black" : "white") + " square-wrapper"} >
          <div className="clue-number-wrapper">
            <div className="clue-number">{this.props.clueNumber}</div>
          </div>
          <input type="text" value={this.props.solution} />
        </div>
      )
    }
  }
}

export class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBlackSquareModeToggle() {
    this.props.actions.toggleBlackSquareMode()
  }

  handleRotationalSymmetryToggle() {
    this.props.actions.toggleRotationalSymmetry()
  }

  render() {
    return (
      <div id="control-panel">
        <ToggleButton onToggle={this.handleBlackSquareModeToggle.bind(this)}
                      text="Edit Black Squares"
                      name="black-squares"
                      status={this.props.settings.blackSquareMode} />
        <div className={this.props.settings.blackSquareMode ? null : "hidden"}>
          <Checkbox onToggle={this.handleRotationalSymmetryToggle.bind(this)}
                  text="Rotational symmetry"
                  status={this.props.settings.rotationalSymmetry} />
        </div>
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

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label><input type="checkbox" className="checkbox"
              onChange={this.props.onToggle} checked={this.props.status} /><span>{this.props.text}</span></label>
    )
  }
}