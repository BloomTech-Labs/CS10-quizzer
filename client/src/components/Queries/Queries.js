import gql from 'graphql-tag'

export const GET_QUIZ_INFORMATION = gql`
  query getQuizInformation($quizId: String!) {
    singleQuiz (QuizID: $quizId) {
      QuizID
      QuizName
      questionSet {
      QuestionID
      QuestionText
      choiceSet {
        ChoiceID
        ChoiceText
        isCorrect
        status
      }
    }
  }
}`
