import React, { Component } from 'react'
import gql from 'graphql-tag'
import { object } from 'prop-types'
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
import EditQuiz from '../EditQuiz/EditQuiz'
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
    const { params } = this.props.match
    const breadcrumbs = []

    for (const param in params) {
      const firstCharCapitalized = params[ param ].charAt(0).toUpperCase()
      const restOfTheString = params[ param ].substr(1)
      const paramData = {
        url: params[ param ],
        displayText: firstCharCapitalized + restOfTheString
      }

      breadcrumbs.push(paramData)
    }

    return breadcrumbs
  }

  hideSideNav = () => {
    this.setState({ hideSideNav: !this.state.hideSideNav })
  }

  logOut = () => {
    this.setState({
      redirect: true
    })
    client.clearStore()
    localStorage.clear()
    this.forceUpdate()
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

              {/**
                * '.map()' over the available parameters from
                *  'this.props.match.params' and generates breadcrumbs depending
                *  on the current URL
                */}
              {this.capitalizeCurrentBreadCrumb().map(({ url, displayText }, ind, arr) => {
                return (
                  arr[ ind + 1 ]
                    ? <BreadcrumbItemStyled key={url} tag='a' href={url}>
                      { displayText }
                    </BreadcrumbItemStyled>
                    : <BreadcrumbItemStyled key={url} active>
                      { displayText }
                    </BreadcrumbItemStyled>
                )
              })}

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
            <Route exact path='/rocket/quizzes/editquiz' component={EditQuiz} />
            <Route component={PageError} />
          </Switch>
        </div>
        {this.state.redirect ? <Redirect to='/' /> : null}
      </div>
    )
  }
}

RocketList.propTypes = {
  match: object
}

export default withRouter(RocketList)
