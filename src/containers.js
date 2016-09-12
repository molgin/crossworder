import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CrosswordGrid from './components'
import * as CrosswordActions from './actions'

const App = ({clues, squares, settings, actions}) => (
  <div>
    <CrosswordGrid squares={squares} actions={actions} settings={settings} />
    {/* later, a cluelist component */}
  </div>
)

App.propTypes = {
  clues: PropTypes.array.isRequired,
  squares: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  clues: state.clues,
  squares: state.squares,
  settings: state.settings
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CrosswordActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)