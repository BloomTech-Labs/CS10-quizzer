import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const apiURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/graphiql/' : '/graphiql/'

export const client = new ApolloClient({
  uri: apiURI
})

render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
  , document.getElementById('root'))
