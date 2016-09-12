const initialState = {
  clues: [],
  squares: [],
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