const width = 10

export function squaresByWidth(width) {
  const height = width
  return Array.apply(null, { length: width })
  .map((e, row) => Array.apply(null, { length: height })
    .map((square, col) => {
      let clueNumber
      if (row === 0)
        clueNumber = col + 1
      else if (col === 0)
        clueNumber = row + width

      return {
        row,
        col,
        clueNumber,
        solution: undefined,
        enabled: true,
      }
    })
  )
}

let squares = squaresByWidth(width)

const initialState = {
  clues: [],
  squares,
  settings: {
    blackSquareMode: false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    // Settings reducers

    case "TOGGLE_BLACK_SQUARE_MODE":
      return Object.assign({}, state, {settings: Object.assign({}, state.settings, {blackSquareMode: !state.settings.blackSquareMode})})

    // Square reducers

    case "TOGGLE_BLACK_SQUARE":
      const {row, col} = action

      const originallyEnabled = state.squares[row][col].enabled
      const newProperties = {enabled: !originallyEnabled}
      if (originallyEnabled) {
        // we're disabling it so clear this stuff
        newProperties.solution = undefined
        newProperties.clueNumber = undefined
      }

      const updateSquare = (squares, row, col, properties) => {
        return [
          ...squares.slice(0, row),
          [
            ...squares[row].slice(0, col),
            Object.assign({}, squares[row][col], properties),
            ...squares[row].slice(col + 1)
          ],
          ...squares.slice(row + 1)
        ]
      }

      // toggling the square in question
      let newSquares = updateSquare(state.squares, row, col, newProperties)

      let lastClueNumber = 1

      // working backwards through the rows to find the previous clue number
      for (let i = row; i >= 0; i--) {
        for (let j = newSquares[row].length - 1; j >= 0; j--) {
          if (i === row && j === newSquares[row].length - 1)
            j = col

          let num = newSquares[i][j].clueNumber
          if (num) {
            lastClueNumber = num + 1
            break;
          }
        }
        if (lastClueNumber > 1)
          break;
      }

      // going through the proceeding squares and updating their clue numbers
      // the toggled square and the squares immediately to the right of and immediately below the toggled square are special cases
      for (let i = row; i < newSquares.length; i++) {
        for (let j = 0; j < newSquares[row].length; j++) {
          if (i === row && j === 0)
            j = col

          let square = newSquares[i][j]

          if (square.enabled) {

            if (
              (square.row === row && square.col === col) ||
              (square.row === row && square.col === col + 1) ||
              (square.row === row + 1 && square.col === col)
              ) {

              if (!originallyEnabled && square.row != 0 && newSquares[square.row - 1][square.col].enabled && square.col != 0 && newSquares[square.row][square.col - 1].enabled) {
                newSquares = updateSquare(newSquares, square.row, square.col, {clueNumber: undefined})
              }
              else {
                newSquares = updateSquare(newSquares, square.row, square.col, {clueNumber: lastClueNumber++})
              }

            }

            else if (square.clueNumber) {
              newSquares = updateSquare(newSquares, square.row, square.col, {clueNumber: lastClueNumber++})

            }

          }


        }
      }

      return Object.assign({}, state, {squares: newSquares})

    default:
      return state
  }
}