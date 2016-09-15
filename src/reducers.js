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
  settings: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DUMMY_ACTION':
      return state

    default:
      return state
  }
}