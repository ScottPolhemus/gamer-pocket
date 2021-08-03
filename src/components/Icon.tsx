import * as React from 'react'
import styled from 'styled-components'

const I = styled.i`
  display: block;
`

const Icon = ({ name = ``, className = `` }: {
  name: string,
  className?: string,
}): JSX.Element => (
  <I className={`material-icons ${className}`.trim()}>{name}</I>
)

export default Icon
