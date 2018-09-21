import React, { Component } from 'react'
import Landing from './components/Landing/Landing'
import QuizPage from './components/QuizPage/QuizPage'
import Result from './components/Result/Result'
import Settings from './components/Settings/Settings'
import RocketList from './components/RocketList/RocketList'
import { Route, withRouter } from 'react-router-dom'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Route exact path='/' component={Landing} />
        <Route exact path='/quiz' component={QuizPage} />
        <Route exact path='/result' component={Result} />
        <Route exact path='/settings' component={Settings} />
        {localStorage.getItem('token') && localStorage.getItem('id') ? <Route exact path='/:userId' component={RocketList} /> : null}
      </div>
    )
  }
}

export default withRouter(App)
