// this will be split up later!

import React from 'react'

export default class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  isBlackSquareMode() {
    return this.props.settings.blackSquareMode
  }

  highlightSymmetricalSquare(row, col) {
    if (this.props.settings.rotationalSymmetry) {
      // console.log(`${row}, ${col}`)
      const newRow = this.props.squares[0].length - row - 1
      const newCol = this.props.squares.length - col - 1
      this.setState({symmetryHighlightRow: newRow, symmetryHighlightCol: newCol})
    }
  }

  onBlackClick(row, col) {
    this.props.actions.toggleBlackSquare(row, col)
    if (this.props.settings.rotationalSymmetry && (row != this.state.symmetryHighlightRow || col != this.state.symmetryHighlightCol)) {
      this.props.actions.toggleBlackSquare(this.state.symmetryHighlightRow, this.state.symmetryHighlightCol)
    }
  }

  handleMouseLeave() {
    if (this.isBlackSquareMode())
      this.setState({symmetryHighlightRow: undefined, symmetryHighlightCol: undefined})
  }

  render() {
    return (
      <table id="crossword-grid"
             className={this.props.settings.blackSquareMode ? "black-square-mode" : null}
             onMouseLeave={this.handleMouseLeave.bind(this)}>
        <tbody>
          {this.props.squares.map((row, i) => <tr key={i}>{row.map((square,j)=>
            <td className="crossword-square" key={j}>
              <CrosswordSquare
                id={square.id}
                row={square.row}
                col={square.col}
                clueNumber={square.clueNumber}
                solution={square.solution}
                enabled={square.enabled}
                symmetryHighlight={square.row === this.state.symmetryHighlightRow && square.col === this.state.symmetryHighlightCol}
                isBlackSquareMode={this.isBlackSquareMode.bind(this)}
                onBlackClick={this.onBlackClick.bind(this)}
                onBlackMouseOver={this.highlightSymmetricalSquare.bind(this)}
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

  handleBlackClick() {
    this.props.onBlackClick(this.props.row, this.props.col)
  }

  handleBlackMouseOver() {
    this.props.onBlackMouseOver(this.props.row, this.props.col)
  }

  render() {
    // temporarily very wet

    const clueNumber = (
      <div className="clue-number-wrapper">
        <div className="clue-number">{this.props.clueNumber}</div>
      </div>
    )

    if (this.props.isBlackSquareMode()) {
      return (
          <div onClick={this.handleBlackClick.bind(this)}
               onMouseOver={this.handleBlackMouseOver.bind(this)}
               className={(!this.props.enabled ? "black" : "white") + (this.props.symmetryHighlight ? " symmetry-highlight" : "") + " square-wrapper"} >
            {clueNumber}
            <div className="square">{this.props.solution}</div>
          </div>
      )
    }
    else {
      return (
        <div onClick={this.handleClick.bind(this)} className={(!this.props.enabled ? "black" : "white") + " square-wrapper"} >
          {clueNumber}
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