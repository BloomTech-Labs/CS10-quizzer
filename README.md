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
### User Creation
When a new user is created, the user must provide a password, as well as verify the password matches in a second input field. Once submitted, the password is hashed and salted prior to being stored in the database, meaning no plaintext password can ever be viewed in the database.

### User Authentication
On signing in as an existing user, assuming the provided password matches what is stored in the database, the user is then provided with a HS256 encrypted JWT containing their unique ID, user name, and email address, as well as a JWT creation time and expiration date.

This JWT **must** be present in the majority of GraphQL communication with the server, as it will be used to identify the user and locate their respective information in the database, helping to prevent any unauthorized use of queries and mutations. Effectively, only students taking the quizzes need no such authentication, as they never have true accounts.

### Customer Payments
No financial information is ever stored in the database, as all transactions are performed directly through Stripe. The only thing that does get stored is simple subscription information and a customer ID for Stripe to use.

## Developer Documentation

### Contributing
WIP

### Local Installation
In order to run the application locally, you'll need to install the following software:
  - [Node.js](https://nodejs.org/en/) - Version 8.12.0
  - [Python 3](https://www.python.org/downloads/) - Version 3.7.0

We also highly recommend using [pipenv](https://github.com/pypa/pipenv) for running a Python virtual environment, as it makes installing necessary dependencies much easier (though we've included a `requirements.txt`).

Once those are taken care of, clone the repository into a directory of your choosing, and the following steps should be performed from the terminal of your choice (bash, cmd, PowerShell, etc.):
#### Client:
- Enter the `client` directory and run either `npm install` or `yarn` in order to install the required packages (we recommend [Yarn](https://yarnpkg.com/en/)).
- Verify the application starts by running either `npm start` or `yarn start`. If it starts up, you're good to go!
#### Server:
(These instructions will assume you're using pipenv as recommended).
- This app makes use of a number of secret values, and in order to develop further, you will also need a local copy with similar values:
  - Create a `.env` file in the root directory, and give it the following keys:
  ```
  SECRET_KEY = You will need to have Django generate a key for you.
  DEBUG = Set this to `True` when debugging, and `False` for production.
  ALLOWED_HOSTS = For development, this can be `localhost,127.0.0.1`
  STRIPE_PUBLIC_KEY = You will need to have an active Stripe account, you can retrieve a public key there.
  STRIPE_SECRET_KEY = Same situation as the Stripe public key.
  SENDGRID_API_KEY = You will need to have an active Sendgrid account, you can retrieve an API key there.
  ```
- From the root directory of the app, run `pipenv install` to install the necessary dependencies.
- Once packages are installed, run `pipenv shell` to enter the virtual environment.
- From here, you'll be able to run server commands. Type `python manage.py makemigrations` to ensure that necessary Django migration data is created.
- Once this is done, run `python manage.py migrate` in order to apply those migrations and create the local development database.
- Finally, run `python manage.py runserver` in order to launch the server.

## API

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
- `Subscription` - String, the users subscription type (basic or premium).
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
Returns `TeacherType`. Useful for getting a single user.

- Arguments:
  - `encJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  {
    teacher(encJwt: "{valid JWT}") {
      TeacherName
      TeacherEmail
    }
  }

  // Returns the name and email address of the user associated with the provided JWT argument.
  ```

#### student
Returns `StudentType`. Useful for getting a single student.

- Arguments:
  - `StudentID` - A string containing a valid StudentID.

- Example Usage:
  ```js
  {
    student(StudentID: "{valid StudentID}") {
      StudentName
      StudentEmail
    }
  }

  // Returns the name and email address of the student associated with the provided StudentID argument.
  ```

#### classStudents
Returns `StudentType`. Useful for getting a list of students associated with a single class.

- Arguments:
  - `ClassID` - A string containing a valid ClassID.

- Example Usage:
  ```js
  {
    classStudents(ClassID: "{valid ClassID}") {
      StudentName
      StudentEmail
    }
  }

  // Returns a list of names and email addresses for all students associated with the provided ClassID argument.
  ```

### Mutations
Mutations allow saving or manipulating data in the database in some way.

#### createClass
Returns a `ClassType` called with `newClass`. Creates and returns a new classroom.

- Arguments:
  - `ClassName` - A string containing the desired name for the classroom.
  - `encJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  mutation {
    createClass(ClassName: "Class One", encJwt: "{valid JWT}") {
      newClass {
        ClassID
      }
    }
  }

  // Creates a new classroom in the database called Class One, which will be associated with the user data in the JWT. The return data, newClass, contains the ClassType information, in this case the ClassID.
  ```

#### updateClass
Returns a `ClassType` called `updatedClass`. Updates information for a currently existing classroom.

- Arguments:
  - `ClassID` - A string containing a valid ClassID.
  - `ClassName` - A string containing the desired name for the classroom.
  - `encJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  mutation {
    updateClass(ClassID: "{valid ClassID}", ClassName: "Fishladder", encJwt: "{valid JWT}") {
      updatedClass {
        ClassID
        ClassName
      }
    }
  }

  // Updates the current classroom associated with the ClassID to have the new name "Fishladder". The JWT is used to verify the user prior to making changes. The return data, updatedClass, contains the ClassType information, in this case the classes ID and new name.
  ```

#### createTeacher
Returns a `TeacherType` called `teacher`, and a JWT string containing user information called `jwtString`. Creates a new user in the database.

- Arguments:
  - `TeacherEmail` - A string containing the desired email address for the user.
  - `TeacherName` - A string containing the desired name for the user.
  - `TeacherPW` - A string containing the desired password for the user.

- Example Usage:
  ```js
  mutation {
    createTeacher(TeacherEmail: "example@example.com", TeacherName: "Example Teacher", TeacherPW: "nuggets") {
      teacher {
        TeacherID
      }
      jwtString
    }
  }

  // Creates a new user in the database with their chosen email address, name, and password (which is hashed and salted). Returns "teacher" which contains their unique ID, as well as a JWT containing their user information needed for authorized interactions with the server.
  ```

#### updateTeacher
Returns a `TeacherType` called `teacher`, and a JWT string containing user information called `jwtString`. Updates a current user in the database.

- Arguments:
  - `NewPassword` - A string containing the current password on the account.
  - `OldPassword` - A string containing the desired new password for the account.
  - `TeacherEmail` - A string containing the desired new email address for the account.
  - `TeacherName` - A string containing the desired new name for the account.
  - `incomingJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  mutation {
    updateTeacher(NewPassword: "not_nuggets", OldPassword: "nuggets", TeacherEmail: "test@test.com", TeacherName: "Test Teacher", incomingJwt: "{valid JWT}") {
      teacher {
        TeacherID
      }
      jwtString
    }
  }

  // Updates the user matching information contained in incomingJwt, overwriting the current password, name, and email address with new data. Returns "teacher" which contains their unique ID, as well as a new JWT containing their user information needed for authorized interactions with the server.
  ```

#### createStudent
Returns a `StudentType` called `student`. Adds a new student to the database.

- Arguments:
  - `ClassID` - A string containing a valid ClassID.
  - `StudentEmail` - A string containing the desired email address for the student.
  - `StudentName` - A string containing the desired name for the student.
  - `encJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  mutation {
    createStudent(ClassID: "{valid ClassID}", StudentEmail: "student@student.com", StudentName: "A Student", encJwt: "{valid JWT}") {
      student {
        StudentID
      }
    }
  }

  // Adds a new student to the database, and returns their unique ID.
  ```

#### deleteStudent
Returns a `StudentType` called `student`. Removes a student from the database.

- Arguments:
  - `StudentID` - A string containing a valid StudentID.
  - `encJwt` - A string containing a valid JWT.

- Example Usage:
  ```js
  mutation {
    deleteStudent(StudentID: "{valid StudentID}", encJwt: "{valid JWT}") {
      student {
        studentID
      }
    }
  }

  // Removes the student associated with the provided StudentID argument from the database, returning an ID no longer present in the database.
  ```

#### createQuiz
Returns a `QuizType` called `quiz`. Creates a new quiz in the database.

- Arguments:
  - `Public` - A Boolean to indicate whether the quiz is publicly accesssible (currently has no effect).
  - `QuizName` - A string containing the desired name of the quiz.
  - `encJWT` - A string containing a valid JWT.

- Example Usage:
  ```js
  mutation {
    createQuiz(Public: false, QuizName: "Quiz One", encJWT: "{valid JWT}") {
      quiz {
        QuizID
      }
    }
  }

  // Creates a new quiz called Quiz One in the database, and returns the ID for that quiz.
  ```

#### createQuestion
Returns a `QuestionType` called `question`. Creates a new question for a quiz in the database.

- Arguments:
  - `QuestionText` - A string containing the desired text for the question.
  - `QuizID` - A string containing a valid QuizID.
  - `encJWT` - A string containing a valid JWT.
  - `isMajor` - A Boolean indicating whether the question is major or not (currently has no effect).

- Example Usage:
  ```js
  mutation {
    createQuestion(QuestionText: "What is 2 + 2?", QuizID: "{valid QuizID}", encJWT: "{valid JWT}", isMajor: false) {
      question {
        QuestionID
      }
    }
  }

  // Creates a new question with the text "What is 2 + 2?" and associates it with a provided QuizID. Returns the unique ID of the added question.
  ```

#### createChoice
Returns a `ChoiceType` called `choice`. Creates a new answer choice for a question in a quiz in the database.

- Arguments:
  - `ChoiceText` - A string containing the desired text for the choice.
  - `QuestionID` - A string containing a valid QuestionID.
  - `encJWT` - A string containing a valid JWT.
  - `isCorrect` - A Boolean, indicates whether this choice is the correct one for the question.

- Example Usage:
  ```js
  mutation {
    createChoice(ChoiceText: "Four", QuestionID: "{valid QuestionID}", encJWT: "{valid JWT}", isCorrect: true) {
      choice {
        ChoiceID
      }
    }
  }

  // Creates a new choice with the text "Four" and associates it with the provided question, setting it to be the correct answer for that question. Returns the unique ID of the choice.
  ```

#### addQuizToClass
Returns a `QuizType` called `quiz`. Associates an existing quiz with an existing classroom.

- Arguments:
  - `Classroom` - A string containing a valid ClassID.
  - `QuizID` - A string containing a valid QuizID.
  - `encJWT` - A string containing a valid JWT.

- Example Usage:
  ```js
  mutation {
    addQuizToClass(Classroom: "{valid ClassID}", QuizID: "{valid QuizID}", encJWT: "{valid JWT}") {
      quiz {
        QuizName
      }
    }
  }

  // Creates a reference between the provided QuizID and ClassID's, in effect adding the quiz to a classroom. This example returns the quiz name.
  ```

#### updateQuizScore
Returns a `QuizScores` called 

- Arguments:
  - `Classroom` - A string containing a valid ClassID.
  - `QuizID` - A string containing a valid QuizID.
  - `Score` - An integer representing the student's score.
  - `StudentID` - A String containing a valid StudentID.

- Example Usage:
  ```js
  mutation {
    updateQuizScore(Classroom: "{valid ClassID}", QuizID: "{valid QuizID}", Score: 20, StudentID: "{valid StudentID}") {
      updatedQuizScore {
        Score
      }
    }
  }

  // Adds a score of 20 for the student associated with StudentID for the quiz associated with QuizID in the class associated with Classroom. Returns the score.
  ```

#### queryTeacher
Returns a `TeacherType` called `teacher`, and a JWT string containing user information called `jwtString`. Used to login as an existing teacher in the database.

- Arguments:
  - `TeacherEmail` - A string containing the email address of a user in the database.
  - `TeacherPW` - A string containing the password of a user in the database.

- Example Usage:
  ```js
  mutation {
    queryTeacher(TeacherEmail: "teacher@teacher.com", TeacherPW: "teaching") {
      teacher {
        TeacherID
      }
      jwtString
    }
  }

  // Returns an ID and a JWT for a valid user.
  ```

## Contributors
| [<img src="https://avatars3.githubusercontent.com/u/17170364?v=4" align="center" width=100><br><b>Brian Durbin</b> ](https://github.com/bdurb) | [<img src="https://avatars0.githubusercontent.com/u/29239201?v=4" align="center" width=100><br><b>Brandon Benefield</b>  ](https://github.com/bbenefield89) | [<img src="https://avatars1.githubusercontent.com/u/35475006?v=4" align="center" width=100><br><b>Edward Gonzalez</b>  ](https://github.com/eddygonzalez9708) | [<img src="https://avatars2.githubusercontent.com/u/26112479?v=4" align="center" width=100><br><b>Daniel Abbott</b>  ](https://github.com/Mephestys) |
|---|---|---|---|

## License
Quizzer is [MIT licensed.](LICENSE)
