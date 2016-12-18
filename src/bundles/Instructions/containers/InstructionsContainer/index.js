/* @flow */

import React, { Component } from 'react'
import Instructions from '@Instructions/components/Instructions'
import connect from './connect'

type Props = {
}

class InstructionsContainer extends Component {

  props: Props

  render() {
    return (
      <Instructions
      />
    )
  }

}

export default connect(InstructionsContainer)


