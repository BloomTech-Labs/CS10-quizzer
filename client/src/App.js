import React, { Component } from 'react'
import Landing from './components/Landing/Landing'
import RocketList from './components/RocketList/RocketList'
import { Route, Redirect, withRouter } from 'react-router-dom'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        {!localStorage.getItem('token') && !localStorage.getItem('id') ? <Route exact path='/' component={Landing} /> : null }
        {localStorage.getItem('token') && localStorage.getItem('id') ? <Route exact path='/:userId' component={Landing} /> : null}
        {localStorage.getItem('token') && localStorage.getItem('id') ? <Route exact path='/:userId/:choice' component={RocketList} /> : null}
        {localStorage.getItem('token') && localStorage.getItem('id') && window.location.pathname === '/' ? <Redirect to={`/${localStorage.getItem('id')}`} /> : null}
      </div>
    )
  }
}

export default withRouter(App)
