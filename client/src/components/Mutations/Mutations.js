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

export const UPDATE_QUIZ = gql`
  mutation updateQuiz($QuizID: String!, $QuizName: String!, $encJwt: String!) {
    updateQuiz(QuizID: $QuizID, QuizName: $QuizName, encJwt: $encJwt) {
      updatedQuiz {
        QuizID
        QuizName
      }
    }
  }`

export const UPDATE_QUESTION = gql`
  mutation ($QuestionID: String!, $QuestionText: String!, $encJwt: String!) {
    updateQuestion(QuestionID: $QuestionID, QuestionText: $QuestionText, encJwt: $encJwt) {
      updatedQuestion {
        QuestionID
        QuestionText
      }
    }
  }`

export const UPDATE_CHOICE = gql`
  mutation ($ChoiceID: String!, $ChoiceText: String!, $isCorrect: Boolean!, $status: Boolean!, $encJwt: String!) {
    updateChoice(ChoiceID: $ChoiceID, ChoiceText: $ChoiceText, isCorrect: $isCorrect, status: $status, encJwt: $encJwt) {
      updatedChoice {
        ChoiceID
        ChoiceText
        isCorrect
        status
      }
    }
  }`

export const DELETE_QUIZ = gql`
  mutation deleteQuiz($QuizID: String!, $encJwt: String!) {
    deleteQuiz(QuizID: $QuizID, encJwt: $encJwt) {
     quiz {
       QuizID
     }
    }
  }`

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($QuestionID: String!, $encJwt: String!) {
    deleteQuestion(QuestionID: $QuestionID, encJwt: $encJwt) {
      question {
        QuestionID
      }
    }
  }`

export const DELETE_CHOICE = gql`
  mutation deleteChoice($ChoiceID: String!, $encJwt: String!) {
    deleteChoice(ChoiceID: $ChoiceID, encJwt: $encJwt) {
      choice {
        ChoiceID
      }
    }
  }`
