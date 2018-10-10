import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Breadcrumb, Button, Row, Col } from 'reactstrap'

import Quizzes from '../Quizzes/Quizzes'
import Classes from '../Classes/Classes'
import Billing from '../Billing/Billing'
import Settings from '../Settings/Settings'
import CreateQuiz from '../CreateQuiz/CreateQuiz'
import PageError from '../PageError/PageError'
import EditClass from '../Classes/EditClass'
import { client } from '../../index'

import './RocketList.css'

import {
  BreadcrumbItemStyled,
  RocketListNavBar,
  RocketSideNav,
  SideNavButton,
  SideNavLinks,
  WelcomeHeader
} from './styled'

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
      hideSideNav: true
    }
  }

  capitalizeCurrentBreadCrumb = () => {
    const { page } = this.props.match.params
    const firstLetterCapitalized = page.charAt(0).toUpperCase()
    const restOfString = page.substr(1)

    return firstLetterCapitalized + restOfString
  }

  hideSideNav = () => {
    this.setState({ hideSideNav: !this.state.hideSideNav })
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
                  <WelcomeHeader className='username'>Welcome {name}</WelcomeHeader>
                )
              }
            }}
          </Query> : null}

        <Row>
          <Col className='col-6'>
            <Breadcrumb tag='nav' className='nav_bread_crumb'>
              <BreadcrumbItemStyled
                tag='a'
                href='/'
              >
                Home
              </BreadcrumbItemStyled>

              <BreadcrumbItemStyled active>
                { this.capitalizeCurrentBreadCrumb() }
              </BreadcrumbItemStyled>
            </Breadcrumb>
          </Col> {/* COL */}

          <Col className='col-6 d-flex justify-content-end'>
            <SideNavButton onClick={this.hideSideNav}>
              =
            </SideNavButton>
          </Col> {/* COL */}
        </Row> {/* ROW */}

        <div className='rocket_list_main'>
          <RocketSideNav>
            <RocketListNavBar
              right={this.state.hideSideNav ? '-100%' : '0'}
            >
              <SideNavLinks to='/rocket/quizzes/'>Quizzes</SideNavLinks>
              <SideNavLinks to='/rocket/classes/'>Classes</SideNavLinks>
              <SideNavLinks to='/rocket/billing/'>Billing</SideNavLinks>
              <SideNavLinks to='/rocket/settings/'>Settings</SideNavLinks>
              <Button color='warning' className='logOut' onClick={this.logOut}>Log Out</Button>
            </RocketListNavBar>
          </RocketSideNav>

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
