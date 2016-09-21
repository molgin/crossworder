const width = 10
const height = width

let squares = Array.apply(null, { length: width })
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

const initialState = {
  clues: [],
  squares,
  settings: {
    blackSquareMode: false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DUMMY_ACTION':
      return state

    case "TOGGLE_BLACK_SQUARE_MODE":
      return Object.assign({}, state, {settings: Object.assign({}, state.settings, {blackSquareMode: !state.settings.blackSquareMode})})

    default:
      return state
  }
}