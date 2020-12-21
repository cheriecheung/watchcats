import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeColor } from '../../../style/theme'

const LinkButton = styled(Link)`
  color: #666;
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: ${themeColor.peach}
  }
`

export default LinkButton