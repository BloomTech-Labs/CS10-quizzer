import React, { Component } from 'react'
import Landing from './components/Landing/Landing'
import RocketList from './components/RocketList/RocketList'
import PageError from './components/PageError/PageError'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Landing} />
          {localStorage.getItem('token') ? <Route exact path='/rocket/:page' component={RocketList} /> : null}
          {localStorage.getItem('token') && (window.location.pathname === '/rocket' || window.location.pathname === '/rocket/') ? <Redirect to='/rocket/quizzes' /> : null}
          <Route component={PageError} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
