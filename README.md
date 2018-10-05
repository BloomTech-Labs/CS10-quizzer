<div align="center">
<h1>Quizzer</h1>
</div>

[ ![Codeship Status for Lambda-School-Labs/CS10-quizzer](https://app.codeship.com/projects/8ea07f40-9e5a-0136-7f9c-425a9ca03814/status?branch=master)](https://app.codeship.com/projects/306228) [![React](https://img.shields.io/badge/React-16.5-blue.svg)](https://reactjs.org/) [![Django](https://img.shields.io/badge/Django-2.1-green.svg)](https://www.djangoproject.com/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Quizzer is a simple web application for teachers to create quizzes and easily email them to their students.

## Stack
Quizzer is built on a straightforward stack: the client is a [React](React) application (created with [Create React App](https://github.com/facebook/create-react-app) and primarily built with [reactstrap](https://github.com/reactstrap/reactstrap) components), while the back-end is a [Django](django) server delivering data from a [PostgreSQL](PostgreSQL) database (or, in a development setting, the default Django [SQLite](SQLite) database.)

Communication between the client and server is achieved through [GraphQL](GraphQL), rather than traditional REST. To accomplish this, the client employs the [React Apollo](ReactApollo) client to properly format and deliver requests, while [Graphene](graphene) is employed server-side to receive, interpret, and respond appropriately to those requests.
### Front-End: React

### Communication: Apollo Client / Graphene (GraphQL)

### Back-End: Django

### Database: SQLite (dev) / PostgreSQL (prod)

## Developer Documentation

### Contributing

### Local Installation

## API


---
## Contributors
| [<img src="https://avatars3.githubusercontent.com/u/17170364?v=4" align="center" width=64><br><b>Brian Durbin</b> ](https://github.com/bdurb) | [<img src="https://avatars0.githubusercontent.com/u/29239201?v=4" align="center" width=64><br><b>Brandon Benefield</b>  ](https://github.com/bbenefield89) | [<img src="https://avatars1.githubusercontent.com/u/35475006?v=4" align="center" width=64><br><b>Edward Gonzalez</b>  ](https://github.com/eddygonzalez9708) | [<img src="https://avatars2.githubusercontent.com/u/26112479?v=4" align="center" width=64><br><b>Daniel Abbott</b>  ](https://github.com/Mephestys) |
|---|---|---|---|

## License
Quizzer is [MIT licensed.](LICENSE)
