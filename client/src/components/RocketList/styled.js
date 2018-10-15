import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BreadcrumbItem } from 'reactstrap'

export const WelcomeHeader = styled.span`
  align-self: flex-end;
  color: #003366;
  display: block;
  font-family: monospace;
  font-size: 19px;
  font-weight: bold;
  margin: 2rem auto;

  @media (min-width: 818px) {
    margin: 2rem 2rem 2rem 0;
  }
`

export const BreadcrumbItemStyled = styled(BreadcrumbItem)`
  display: none;

  @media (min-width: 818px) {
    display: block;
    font-family: monospace;
    font-size: 20px;
  }
`

export const RocketSideNav = styled.div`
  @media (min-width: 818px) {
    flex: 1;
    max-width: 200px;
  }
`

export const SideNavButton = styled.button`
  background: none;
  border: none;
  color: #010101;
  font-size: 4rem;
  outline: none;
  position: absolute;
  right: 50px;
  top: -31px;
  width: 40px;

  &:focus {
    outline: none;
  }

  @media (min-width: 818px) {
    display: none;
    width: 230%
  }
`

export const RocketListNavBar = styled.div`
  background: #003366;
  border: 3px solid #000000;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  position: absolute;
  right: ${({ right }) => right}
  transition: right 0.25s;
  min-height: 100vh;
  width: 100%;
  z-index: 99;

  @media (min-width: 818px) {
    display: flex;
<<<<<<< HEAD
<<<<<<< HEAD
    width: 230%
=======
=======
    position: inherit;
>>>>>>> 185f3b5b98ef89746698cee33a94be4145c49af2
    width: auto;
>>>>>>> 6c69c6b40ec3c81c0703a2ff48ada5d8f40d0880
  }
`

export const SideNavLinks = styled(Link)`
  color: #fefefe;
  margin-bottom: 2rem;

  &:nth-child(1) {
    margin-top: 2rem;
  }
`
