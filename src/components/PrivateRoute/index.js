import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PrivateRoute extends React.Component {
  async componentWillMount() {
    try {
      const { login } = this.props
      const jwtToken = localStorage.getItem('jwtToken')
      await login({ jwtToken })
    } catch(error) {
      const { logout } = this.props
      await logout()
    }
  }

  render() {
    const { path, component: Component, render, userInfo, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props => {
          if (!userInfo)
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
          return Component ? <Component {...props} /> : render(props)
        }}
      />
    )
  }
}

PrivateRoute.propTypes = {
  userInfo: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func
}

const mapState = state => ({
  userInfo: state.User.userInfo
})

const mapDispatch = dispatch => ({
  login: dispatch.User.login,
  logout: dispatch.User.logout
})

export default connect(mapState, mapDispatch)(PrivateRoute)
