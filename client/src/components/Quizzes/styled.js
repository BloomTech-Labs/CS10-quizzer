import styled from 'styled-components'

export const AddQuizContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 930px) {
    justify-content: space-around;
    padding-left: .5rem;
    padding-right: .5rem;
  }
`

export const Cards = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  max-width: ${({ maxWidth = '350px' }) => maxWidth};
`
