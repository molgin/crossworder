import { expect } from 'chai'
import Reducer from '../src/reducers'
import { squaresByWidth } from '../src/reducers'

describe("TOGGLE_BLACK_SQUARE_MODE", () => {

  let onState = {
    squares: [],
    clues: [],
    settings: {blackSquareMode: true}
  }

  let offState = {
    squares: [],
    clues: [],
    settings: {blackSquareMode: false}
  }

  it('toggles the mode from off to on', () => {
    expect(Reducer(offState, {type: "TOGGLE_BLACK_SQUARE_MODE"}).settings.blackSquareMode).to.equal(true)
  })

  it('toggles the mode from on to off', () => {
    expect(Reducer(onState, {type: "TOGGLE_BLACK_SQUARE_MODE"}).settings.blackSquareMode).to.equal(false)
  })

})

describe("TOGGLE_BLACK_SQUARE", () => {

  let allSquaresEnabled = {
    squares: [
      [
        {row: 0, col: 0, clueNumber: 1, enabled: true, solution: undefined},
        {row: 0, col: 1, clueNumber: 2, enabled: true, solution: undefined},
        {row: 0, col: 2, clueNumber: 3, enabled: true, solution: undefined}
      ],
      [
        {row: 1, col: 0, clueNumber: 4, enabled: true, solution: undefined},
        {row: 1, col: 1, clueNumber: undefined, enabled: true, solution: undefined},
        {row: 1, col: 2, clueNumber: undefined, enabled: true, solution: undefined}
      ],
      [
        {row: 2, col: 0, clueNumber: 5, enabled: true, solution: undefined},
        {row: 2, col: 1, clueNumber: undefined, enabled: true, solution: undefined},
        {row: 2, col: 2, clueNumber: undefined, enabled: true, solution: undefined}
      ]
    ]
  }

  let middleSquareDisabled = {
    squares: [
      [
        {row: 0, col: 0, clueNumber: 1, enabled: true, solution: undefined},
        {row: 0, col: 1, clueNumber: 2, enabled: true, solution: undefined},
        {row: 0, col: 2, clueNumber: 3, enabled: true, solution: undefined}
      ],
      [
        {row: 1, col: 0, clueNumber: 4, enabled: true, solution: undefined},
        {row: 1, col: 1, clueNumber: undefined, enabled: false, solution: undefined},
        {row: 1, col: 2, clueNumber: 5, enabled: true, solution: undefined}
      ],
      [
        {row: 2, col: 0, clueNumber: 6, enabled: true, solution: undefined},
        {row: 2, col: 1, clueNumber: 7, enabled: true, solution: undefined},
        {row: 2, col: 2, clueNumber: undefined, enabled: true, solution: undefined}
      ]
    ]
  }

  let cornerSquareDisabled = {
    squares: [
      [
        {row: 0, col: 0, clueNumber: undefined, enabled: false, solution: undefined},
        {row: 0, col: 1, clueNumber: 1, enabled: true, solution: undefined},
        {row: 0, col: 2, clueNumber: 2, enabled: true, solution: undefined}
      ],
      [
        {row: 1, col: 0, clueNumber: 3, enabled: true, solution: undefined},
        {row: 1, col: 1, clueNumber: undefined, enabled: true, solution: undefined},
        {row: 1, col: 2, clueNumber: undefined, enabled: true, solution: undefined}
      ],
      [
        {row: 2, col: 0, clueNumber: 4, enabled: true, solution: undefined},
        {row: 2, col: 1, clueNumber: undefined, enabled: true, solution: undefined},
        {row: 2, col: 2, clueNumber: undefined, enabled: true, solution: undefined}
      ]
    ]
  }

  let topMiddleSquareDisabled = {
    squares: [
      [
        {row: 0, col: 0, clueNumber: 1, enabled: true, solution: undefined},
        {row: 0, col: 1, clueNumber: undefined, enabled: false, solution: undefined},
        {row: 0, col: 2, clueNumber: 2, enabled: true, solution: undefined}
      ],
      [
        {row: 1, col: 0, clueNumber: 3, enabled: true, solution: undefined},
        {row: 1, col: 1, clueNumber: 4, enabled: true, solution: undefined},
        {row: 1, col: 2, clueNumber: undefined, enabled: true, solution: undefined}
      ],
      [
        {row: 2, col: 0, clueNumber: 5, enabled: true, solution: undefined},
        {row: 2, col: 1, clueNumber: undefined, enabled: true, solution: undefined},
        {row: 2, col: 2, clueNumber: undefined, enabled: true, solution: undefined}
      ]
    ]
  }

  it('disables a middle square and correctly recalculates clue numbers', () => {

    expect(Reducer(allSquaresEnabled, {type: "TOGGLE_BLACK_SQUARE", row: 1, col: 1})).to.deep.equal(middleSquareDisabled)

  })

  it('disables a corner square and correctly recalculates clue numbers', () => {

    expect(Reducer(allSquaresEnabled, {type: "TOGGLE_BLACK_SQUARE", row: 0, col: 0})).to.deep.equal(cornerSquareDisabled)

  })

  it('disables a top middle square and correctly recalculates clue numbers', () => {

    expect(Reducer(allSquaresEnabled, {type: "TOGGLE_BLACK_SQUARE", row: 0, col: 1})).to.deep.equal(topMiddleSquareDisabled)

  })

  it('enables a middle square and correctly recalculates clue numbers', () => {

    expect(Reducer(middleSquareDisabled, {type: "TOGGLE_BLACK_SQUARE", row: 1, col: 1})).to.deep.equal(allSquaresEnabled)

  })

  it('enables a corner square and correctly recalculates clue numbers', () => {

    expect(Reducer(cornerSquareDisabled, {type: "TOGGLE_BLACK_SQUARE", row: 0, col: 0})).to.deep.equal(allSquaresEnabled)

  })

  it('enables a top middle square and correctly recalculates clue numbers', () => {

    expect(Reducer(topMiddleSquareDisabled, {type: "TOGGLE_BLACK_SQUARE", row: 0, col: 1})).to.deep.equal(allSquaresEnabled)

  })


})