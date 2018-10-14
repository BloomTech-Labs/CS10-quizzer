import gql from 'graphql-tag'

export const CREATE_QUIZ = gql`
  mutation createQuiz($Public: Boolean!, $QuizName: String!, $encJWT: String!) {
    createQuiz(Public: $Public, QuizName: $QuizName, encJWT: $encJWT) {
      quiz {
        QuizID
      }
    }
  }`

export const CREATE_QUESTION = gql`
  mutation createQuestion($QuestionText: String!, $QuizID: String!, $encJWT:String!, $isMajor: Boolean!) {
    createQuestion(QuestionText: $QuestionText, QuizID: $QuizID, encJWT: $encJWT, isMajor: $isMajor) {
      question {
        QuestionID
      }
    }
  }`

export const CREATE_CHOICE = gql`
  mutation createChoice($ChoiceText: String!, $QuestionID: String!, $encJWT: String!, $isCorrect: Boolean!, $status: Boolean!) {
    createChoice(ChoiceText: $ChoiceText, QuestionID: $QuestionID, encJWT: $encJWT, isCorrect: $isCorrect, status: $status) {
      choice {
        ChoiceID
      }
    }
  }`
