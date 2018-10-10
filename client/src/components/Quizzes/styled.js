import styled from 'styled-components'

export const AddQuizContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 794px) {
    justify-content: space-between
  }

  @media (min-width: 818px) {
    justify-content: center;
  }
  
  @media (min-width: 994px) {
    justify-content: center;
    padding-left: .5rem;
    padding-right: .5rem;
  }

  @media (min-width: 1010px) {
    justify-content: flex-start
  }
`

export const Cards = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  max-width: ${({ maxWidth = '350px' }) => maxWidth};

  @media (min-width: 730px) {
    margin-right: 2rem;
  }
`
