<div align="center">
<h1>Quizzer</h1>
</div>

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[ ![Codeship Status for Lambda-School-Labs/CS10-quizzer](https://app.codeship.com/projects/8ea07f40-9e5a-0136-7f9c-425a9ca03814/status?branch=master)](https://app.codeship.com/projects/306228) [![React](https://img.shields.io/badge/React-16.5-blue.svg)](https://reactjs.org/) [![Django](https://img.shields.io/badge/Django-2.1-green.svg)](https://www.djangoproject.com/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Quizzer](https://quizzercs10.herokuapp.com/) is a simple web application for teachers to create quizzes and quickly distribute them to students via email.

## Contents
1. [Our Project Stack](#our-project-stack)
    - [Why These Technologies?](#why-these-technologies)
1. [Testing](#testing)
1. [Security](#security)
1. [Developer Documentation](#developer-documentation)
    - [Contributing](#contributing)
    - [Local Installation](#local-installation)
    - [API](#api)
1. [Contributors](#contributors)
1. [License](#license)

## Our Project Stack
Quizzer is built on a straightforward stack: the client is a [React](https://github.com/facebook/react) application (created with [Create React App](https://github.com/facebook/create-react-app) and primarily built with [reactstrap](https://github.com/reactstrap/reactstrap) components), while the back-end is a [Django](https://www.djangoproject.com/) server, which both serves up the client itself, and delivers data to and from a [PostgreSQL](https://www.postgresql.org/) database (or, in a development environment, the default Django [SQLite](https://www.sqlite.org/index.html) database.)

Communication between the client and server is achieved through [GraphQL](https://graphql.org/), rather than traditional REST. To accomplish this, the client employs the [React Apollo Client](https://www.apollographql.com/docs/react/) client to properly format and parse requests and responses, while [Graphene-Django](https://docs.graphene-python.org/projects/django/en/latest/) is employed server-side to receive, interpret, and respond appropriately to the client.

Lastly, our application is set up for continuous integration and automatic deploy: any updates to the `master` branch are first processed through [Codeship](https://codeship.com/) for testing and, assuming tests pass, deployed to [Heroku](https://heroku.com/) where it can be accessed by the end-user.

### Why These Technologies?

- **React:** This was a simple choice to make, both due to the team's familiarity with React, and because its component-based structure allows rapid implementation of a functional user interface with a minimum of effort.

- **Django:** Using Django allows us to access and save to a SQL-based database without needing to write cumbersone SQL queries, thanks to its simple MVC approach. Django also makes it trivial to serve the client directly, rather than needing to deploy client and server separately.

- **PostgreSQL / SQLite:** As our application makes use of relational data, e.g. which quiz is assigned to what class, it made sense early on to use a relational database, which are traditionally SQL based. Fortunately, Django integrates quickly with both SQLite, which it uses by default for development purposes, and PostgreSQL, which Heroku uses by default.

- **GraphQL:** The idea of sending and receiving ONLY data relevant to any function of the app, e.g. sending and receiving JUST the name of the classroom when updating the classroom's name, was appealing from the very beginning, as traditional REST will typically give you the entire box instead of the one item you actually want.

  - Accomplishing this communication was fairly simple to implement, as the Apollo Client integrates easily with React, providing components to quickly interpret and fire off GraphQL queries and mutations, while Graphene gives similar functionality to Django, integrating directly with schemas and models we had already created for the database.

- **Codeship:** In order to verify that any changes pushed to the `master` branch don't break the app prior to reaching production, we integrated Codeship into our GitHub project. Due to time constraints and the smaller size of our team, we haven't written any true unit tests within Codeship, however it does serve to verify that the app builds successfully.
  - All branches within the project also process through Codeship on new commits, meaning that pull requests will clearly show a reviewer whether the changes still build, prior to them directly reviewing those changes.

  - Additionally, we integrated Codeship into our Slack team channel, which displays messages when a build fails, or when a previously failing build is now passing. This allows us to stay apprised of any issues affecting any team member's work.

- **Heroku:** As we are using Django, we decided early on to simply allow it to serve up the client directly, rather than deploy our server to one service, and our client to another. This necessitated using a service which could support hosting a database in addition to serving up static assets, and Heroku fit that bill nicely.

## Testing
Aside from Codeship verifying builds prior to deploy, our testing has been completely manual. On reviewing new PR's, we pull down the respective branch and commence testing the new feature, bug fix, etc. to verify it works as advertised, as well as checking whether the changes impact any other, unrelated functionality.

## Security
WIP

## Developer Documentation

### Contributing
WIP

### Local Installation
WIP

## API
As our API is based on GraphQL, every request to the server must be a `POST` request, formatted as `application/json`.

### Schemas
For the API, a schema can be thought of as a collection of possible returns for a query, based on the data models created in Django to be used with the database. As an example, if a query returns a `ClassType`, optional returned data could include the ID or name of a classroom, the set of students which are associated with that classroom, or all of the above. With GraphQL, you only get the data you ask for.

Following is a list of schemas and their possible returns:

#### TeacherType
This schema deals with users (internally called teachers to differentiate them from student users).
- `TeacherID` - String, the users unique ID (internally a UUID type, converted to a string for the client).
- `TeacherEmail` - String, the users email address.
- `TeacherName` - String, the users name.
- `TeacherPW` - String, the hashed and salted users password (passwords are unavailable as plain text).
- `CustomerID` - String, the users Stripe customer ID (empty if the user does not have a paid subscription).
- `Subscription` - ???
- `createdAt` - DateTime, value containing the date and time the data was created in the database. Can be read as a string.
- `lastModified` - DateTime, value containing the date and time the data was last modified in the database. Can be read as a string.
- `classSet` - Relational, returns `ClassType`, useful for accessing classroom data specific to the user.
- `quizSet` - Relational, returns `QuizType`, useful for accessing quiz data specific to the user.

#### QuizType
This schema deals with user-created quizzes.
- `QuizID` - String, the quiz's unique ID (internally a UUID type, converted to a string for the client).
- `QuizName` - String, the quiz name.
- `Public` - Boolean, declares whether the quiz is publicly accessible (currently unused).
- `createdAt` - DateTime, value containing the date and time the data was created in the database. Can be read as a string.
- `lastModified` - DateTime, value containing the date and time the data was last modified in the database. Can be read as a string.
- `Teacher` - Relational, returns `TeacherType`, useful for accessing user data specific to the quiz.
- `Classes` - Relational, returns `ClassType`, useful for accessing classroom data specific to the quiz.
- `questionSet` - Relational, returns `QuestionType`, useful for accessing question data specific to the quiz.
- `studentSet` - Relational, returns `StudentType`, useful for accessing student data specific to the quiz.

#### QuestionType
This schema governs questions which are asked within quizzes.
- `QuestionID` - String, the question's unique ID (internally a UUID type, converted to a string for the client).
- `Question` - String, the text content of the question.
- `isMajor` - Boolean, meant to be used to indicate whether a question is major or minor (currently unused).
- `createdAt` - DateTime, value containing the date and time the data was created in the database. Can be read as a string.
- `lastModified` - DateTime, value containing the date and time the data was last modified in the database. Can be read as a string.
- `QuizID` - Relational, returns `QuizType`, useful for accessing quiz data specific to the question. (Special note, this is mainly just used to access the ID of a quiz to associate a question with a quiz, hence the name QuizID).
- `choiceSet` - Relational, returns `ChoiceType`, useful for accessing choice (answers) data specific to the question.

#### ChoiceType
This schema covers answer options within questions.
- `ChoiceID` - String, the choice's unique ID (internally a UUID type, converted to a string for the client).
- `ChoiceText` - String, the text content of the choice.
- `isCorrect` - Boolean, whether this choice is the correct one for the question.
- `createdAt` - DateTime, value containing the date and time the data was created in the database. Can be read as a string.
- `lastModified` - DateTime, value containing the date and time the data was last modified in the database. Can be read as a string.
- `QuestionID` - Relational, returns `QuestionType`, useful for accessing question data specific to the choice.

#### QuizScores
This schema handles student quiz score data.
- `QuizScoreID` - String, the quiz scores unique ID (internally a UUID type, converted to a string for the client).
- `StudentID` - String, the student owning the quiz scores unique ID (internally a UUID type, converted to a string for the client).
- `QuizID` - String, the quiz owning the quiz scores unique ID (internally a UUID type, converted to a string for the client).
- `Score` - Int, the score a student has received for a quiz.
- `createdAt` - DateTime, value containing the date and time the data was created in the database. Can be read as a string.
- `lastModified` - DateTime, value containing the date and time the data was last modified in the database. Can be read as a string.
- `ClassID` - Relational, returns `ClassType`, useful for accessing class data specific to the quiz score.

#### ClassType
This schema is for classrooms created by the user, where they'll be able to add students and assign quizzes to those students.
- `ClassID` - String, the classes unique ID (internally a UUID type, converted to a string for the client).
- `ClassName` - String, the name of the class.
- `Teacher` - Relational, returns `TeacherType`, useful for accessing teacher data specific to the class.
- `createdAt` - DateTime, value containing the date and time the data was created in the database. Can be read as a string.
- `lastModified` - DateTime, value containing the date and time the data was last modified in the database. Can be read as a string.
- `quizSet` - Relational, returns `QuizType`, useful for accessing quiz data specific to the class.
- `studentSet` - Relational, returns `StudentType`, useful for accessing student data specific to the class.
- `quizscoresSet` - Relational, returns `QuizScoresType`, useful for accessing quiz score data specific to the class.

#### StudentType
This schema relates to individual student data.
- `StudentID` - String, the student's unique ID (internally a UUID type, converted to a string for the client).
- `StudentName` - String, the name of the student.
- `StudentEmail` - String, the email address of the student.
- `createdAt` - DateTime, value containing the date and time the data was created in the database. Can be read as a string.
- `lastModified` - DateTime, value containing the date and time the data was last modified in the database. Can be read as a string.
- `ClassID` - Relational, returns `ClassType`, useful for accessing class data specific to the student (called ClassID since it has been primarily used for accessing a classrooms ID).
- `Quizzes` - Relational, returns `QuizType`, useful for accessing quiz data specific to the student.

### Queries
Queries are used to retrieve data from the server without altering that data in some way.

#### classes
Returns `ClassType`. Useful for getting all the classroom created by the user
- Arguments:
  - `encJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  {
    classes(encJwt: "{valid jwt}") {
      ClassID
      ClassName
    }
  }

  // Returns a list of all class ID's and class names for classrooms created by the user specified in the JWT.
  ```

#### singleClass
Returns `ClassType`. Useful for getting data on a single classroom based on a provided ClassID.
- Arguments:
  - `ClassID` - A string containing a valid ClassID.

- Example Usage:
  ```js
  {
    singleClass(ClassID: "{valid ClassID}") {
      ClassName
    }
  }

  // Returns the name of the classroom associated with the provided ClassID argument.
  ```

#### publicQuizzes (currently unused)

#### singleQuiz
Returns `QuizType`. Useful for getting data on a single quiz based on a provided QuizID.

- Arguments:
  - `QuizID` - A string containing a valid QuizID.

- Example Usage:
  ```js
  {
    singleQuiz(QuizID: "{valid QuizID}") {
      QuizName
    }
  }

  // Returns the name of the quiz associated with the provided QuizID argument.
  ```

#### classQuizzes
Returns `QuizType`. Useful for getting a list of quizzes associated with a single classroom.

- Arguments:
  - `ClassID` - A string containing a valid ClassID.

- Example Usage:
  ```js
  {
    classQuizzes(ClassID: "{valid ClassID}") {
      QuizID
      QuizName
    }
  }

  // Returns a list of quiz ID's and quiz names associated with the provided ClassID argument.
  ```

#### teacherQuizzes
Returns `QuizType`. Useful for getting a list of quizzes associated with a single user.

- Arguments:
  - `encJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  {
    teacherQuizzes(encJwt: "{valid JWT}") {
      QuizID
      QuizName
    }
  }

  // Returns a list of quiz ID's and quiz names associated with the teacher found in the provided JWT argument.
  ``` 

#### quizQuestions
Returns `QuestionType`. Useful for retrieving all questions associated with a single quiz.

- Arguments:
  - `QuizID` - A string containing a valid QuizID.

- Example Usage:
  ```js
  {
    quizQuestions(QuizID: "{valid QuizID}") {
      QuestionID
      Question
    }
  }

  // Returns a list of question ID's and question text associated with the provided QuizID argument.
  ```

#### teacher

#### student

#### classStudents

### Mutations
Mutations allow saving new, or manipulating current, data in some way.

## Contributors
| [<img src="https://avatars3.githubusercontent.com/u/17170364?v=4" align="center" width=100><br><b>Brian Durbin</b> ](https://github.com/bdurb) | [<img src="https://avatars0.githubusercontent.com/u/29239201?v=4" align="center" width=100><br><b>Brandon Benefield</b>  ](https://github.com/bbenefield89) | [<img src="https://avatars1.githubusercontent.com/u/35475006?v=4" align="center" width=100><br><b>Edward Gonzalez</b>  ](https://github.com/eddygonzalez9708) | [<img src="https://avatars2.githubusercontent.com/u/26112479?v=4" align="center" width=100><br><b>Daniel Abbott</b>  ](https://github.com/Mephestys) |
|---|---|---|---|

## License
Quizzer is [MIT licensed.](LICENSE)
