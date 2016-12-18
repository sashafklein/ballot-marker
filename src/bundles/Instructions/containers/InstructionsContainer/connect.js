/* @flow */

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { } from '@store/modules/instructions'

const mapStateToProps = (state) => ({
  instructions: state.instructions,
})

const mapActionsToProps = { }

export default (container) => compose(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )
)(container)


