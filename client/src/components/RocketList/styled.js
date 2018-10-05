import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SideNavButton = styled.button`
  background: none;
  border: none;
  color: #010101;
  font-size: 4rem;
  position: absolute;
  right: 17px;
  top: 31px;
  width: 40px;
`

export const RocketListNavBar = styled.div`
  background: #003366;
  border: 3px solid #000000;
  display: ${({ display }) => display}
  flex-direction: column;
  align-items: center;
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  min-height: 100vh;
  margin: 0;
  width: 100vw;
`

export const SideNavLinks = styled(Link)`
  color: #fefefe;
  margin-bottom: 2rem;

  &:nth-child(1) {
    margin-top: 2rem;
  }
`
