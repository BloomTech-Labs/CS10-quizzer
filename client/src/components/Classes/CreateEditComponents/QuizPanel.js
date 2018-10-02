import React from 'react'
import QuizCard from './QuizCard'
import QuizSelector from './QuizSelector'
import { Query } from 'react-apollo'
import { string } from 'prop-types'
import gql from 'graphql-tag'

const GET_CLASS_QUIZZES = gql`
query GetClassQuizzes($ClassID: String!) {
  classQuizzes(ClassID: $ClassID) {
    QuizID
    QuizName
  }
}`

function QuizPanel (props) {
  const classID = props.classID

  return (
    <div>
      <h4>Quizzes</h4>
      <Query query={GET_CLASS_QUIZZES} variables={{ ClassID: classID }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return error.message
          if (data) {
            const quizzes = data.classQuizzes
            if (quizzes.length > 0) {
              return (
                <ul>
                  {quizzes.map((quiz) => {
                    return (
                      <QuizCard
                        key={quiz.QuizID}
                        quizName={quiz.QuizName}
                      />
                    )
                  })}
                </ul>
              )
            } else {
              return null
            }
          }
        }}
      </Query>
      <QuizSelector classID={classID} />
    </div>
  )
}

QuizPanel.propTypes = {
  classID: string
}

export default QuizPanel
