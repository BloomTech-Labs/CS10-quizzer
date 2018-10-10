import gql from 'graphql-tag'

export const GET_QUIZ_INFORMATION = gql`
  query getQuizInformation($quizId: String!) {
    singleQuiz (QuizID: $quizId) {
      QuizID
      QuizName
      questionSet {
      QuestionID
      Question
      choiceSet {
        ChoiceID
        ChoiceText
        isCorrect
      }
    }
  }
}`