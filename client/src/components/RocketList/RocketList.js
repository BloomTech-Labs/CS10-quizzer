import React, { Component } from 'react'
import Quizzes from '../Quizzes/Quizzes'
import Classes from '../Classes/Classes'
import Billing from '../Billing/Billing'
import Settings from '../Settings/Settings'
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
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
        {window.location.pathname === `/${localStorage.getItem('id')}/quizzes`
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Quizzes</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === `/${localStorage.getItem('id')}/classes`
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Classes</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === `/${localStorage.getItem('id')}/billing`
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Billing</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === `/${localStorage.getItem('id')}/settings`
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Settings</BreadcrumbItem>
          </Breadcrumb>
          : null }
        <div className='rocket_list_main'>
          <div className='rocket_list_navbar'>
            <Link to={`/${localStorage.getItem('id')}/quizzes`}>Quizzes</Link>
            <Link to={`/${localStorage.getItem('id')}/classes`}>Classes</Link>
            <Link to={`/${localStorage.getItem('id')}/billing`}>Billing</Link>
            <Link to={`/${localStorage.getItem('id')}/settings`}>Settings</Link>
            <Button color='warning' className='logOut' onClick={this.logOut}>Log Out</Button>
          </div>
          <Route exact path='/:userId/quizzes' component={Quizzes} />
          <Route exact path='/:userId/classes' component={Classes} />
          <Route exact path='/:userId/billing' component={Billing} />
          <Route exact path='/:userId/settings' component={Settings} />
        </div>
        {this.state.redirect ? <Redirect to='/' /> : null}
      </div>
    )
  }
}

export default withRouter(RocketList)
