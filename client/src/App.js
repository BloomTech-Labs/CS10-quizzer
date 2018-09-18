import React, { Component } from 'react';
import Home from './components/Home/Home';
import QuizPage from './components/QuizPage/QuizPage';
import Result from './components/Result/Result';
import Subscribe from './components/Subscribe/Subscribe';
import { Route, withRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/quiz' component={QuizPage} />
        <Route exact path='/result' component={Result} />
        <Route exact path='/subscribe' component={ Subscribe } />
      </div>
    )
  }
}

export default withRouter(App)
