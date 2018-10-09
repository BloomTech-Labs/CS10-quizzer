import React from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'

const Styles = styled.div`
  flex: 1
`

const RocketStyles = props => {
  return (
    <Styles>
      { props.children }
    </Styles>
  )
}

RocketStyles.propTypes = {
  children: array
}

export default RocketStyles
