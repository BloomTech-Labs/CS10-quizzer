import React, { Component } from 'react'
import Quizzes from '../Quizzes/Quizzes'
import Classes from '../Classes/Classes'
import Billing from '../Billing/Billing'
import Settings from '../Settings/Settings'
import PageError from '../PageError/PageError'
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom'
import './RocketList.css'

class RocketList extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      redirect: false
    }
  }

  logOut = () => {
    localStorage.clear()
    this.forceUpdate()
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <div className='rocket_list_container'>
        <span className='username'>Welcome {this.state.username}</span>
        {window.location.pathname === '/rocket/quizzes/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Quizzes</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/classes/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Classes</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/billing/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Billing</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/settings/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Settings</BreadcrumbItem>
          </Breadcrumb>
          : null }
        <div className='rocket_list_main'>
          <div className='rocket_list_navbar'>
            <Link to='/rocket/quizzes/'>Quizzes</Link>
            <Link to='/rocket/classes/'>Classes</Link>
            <Link to='/rocket/billing/'>Billing</Link>
            <Link to='/rocket/settings/'>Settings</Link>
            <Button color='warning' className='logOut' onClick={this.logOut}>Log Out</Button>
          </div>
          <Switch>
            <Route exact path='/rocket/quizzes/' component={Quizzes} />
            <Route exact path='/rocket/classes/' component={Classes} />
            <Route exact path='/rocket/billing/' component={Billing} />
            <Route exact path='/rocket/settings/' component={Settings} />
            <Route component={PageError} />
          </Switch>
        </div>
        {this.state.redirect ? <Redirect to='/' /> : null}
      </div>
    )
  }
}

export default withRouter(RocketList)
