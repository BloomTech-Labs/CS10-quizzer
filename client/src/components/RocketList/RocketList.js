import React, { Component } from 'react'
import Quizzes from '../Quizzes/Quizzes'
import Classes from '../Classes/Classes'
import Billing from '../Billing/Billing'
import Settings from '../Settings/Settings'
import CreateQuiz from '../CreateQuiz/CreateQuiz'
import PageError from '../PageError/PageError'
import EditClass from '../Classes/EditClass'
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { client } from '../../index'
import { Query } from 'react-apollo'

import './RocketList.css'
import { SideNavButton, RocketListNavBar, SideNavLinks } from './styled'

const GET_CURRENT_USER = gql`
  query getUser($token:String!) {
    teacher(encJwt:$token) {
      TeacherName
    }
  }`

class RocketList extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false,
      sideNavHidden: true
    }
  }

  hideSideNav = () => {
    console.log('fooooo')
    this.setState({ sideNavHidden: !this.state.sideNavHidden })
  }

  logOut = () => {
    client.clearStore()
    localStorage.clear()
    this.forceUpdate()
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <div className='rocket_list_container'>
        {localStorage.getItem('token')
          ? <Query query={GET_CURRENT_USER} variables={{ token: localStorage.getItem('token') }}>
            {({ data, loading }) => {
              if (loading || !data) {
                return <span className='username'>Loading...</span>
              }

              const name = data.teacher[0].TeacherName

              if (name) {
                return (
                  <span className='username'>Welcome {name}</span>
                )
              }
            }}
          </Query> : null}
        {window.location.pathname === '/rocket/quizzes' || window.location.pathname === '/rocket/quizzes/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Quizzes</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/classes' || window.location.pathname === '/rocket/classes/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Classes</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/classes/editclass' || window.location.pathname === '/rocket/classes/editclass/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem tag='a' href='/rocket/classes'>Classes</BreadcrumbItem>
            <BreadcrumbItem active>Edit Class</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/billing' || window.location.pathname === '/rocket/billing/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Billing</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/settings' || window.location.pathname === '/rocket/settings/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem active>Settings</BreadcrumbItem>
          </Breadcrumb>
          : null }
        {window.location.pathname === '/rocket/quizzes/createquiz' || window.location.pathname === '/rocket/quizzes/createquiz/'
          ? <Breadcrumb tag='nav' className='nav_bread_crumb'>
            <BreadcrumbItem tag='a' href='/'>Home</BreadcrumbItem>
            <BreadcrumbItem tag='a' href='/rocket/quizzes'>Quizzes</BreadcrumbItem>
            <BreadcrumbItem active>Create Quiz</BreadcrumbItem>
          </Breadcrumb>
          : null }

        <div className='rocket_list_main'>
          <div className='rocket_side_nav'>
            <SideNavButton onClick={this.hideSideNav}>
              =
            </SideNavButton>

            <RocketListNavBar
              display={this.state.sideNavHidden ? 'none' : 'flex'}
            >
              <SideNavLinks to='/rocket/quizzes/'>Quizzes</SideNavLinks>
              <SideNavLinks to='/rocket/classes/'>Classes</SideNavLinks>
              <SideNavLinks to='/rocket/billing/'>Billing</SideNavLinks>
              <SideNavLinks to='/rocket/settings/'>Settings</SideNavLinks>
              <Button color='warning' className='logOut' onClick={this.logOut}>Log Out</Button>
            </RocketListNavBar>
          </div>

          <Switch>
            <Route exact path='/rocket/quizzes' component={Quizzes} />
            <Route exact path='/rocket/classes' component={Classes} />
            <Route exact path='/rocket/billing' component={Billing} />
            <Route exact path='/rocket/settings' component={Settings} />
            <Route exact path='/rocket/quizzes/createquiz' component={CreateQuiz} />
            <Route exact path='/rocket/classes/editclass' component={EditClass} />
            <Route component={PageError} />
          </Switch>
        </div>
        {this.state.redirect ? <Redirect to='/' /> : null}
      </div>
    )
  }
}

export default withRouter(RocketList)
