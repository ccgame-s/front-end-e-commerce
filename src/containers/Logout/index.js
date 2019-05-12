import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  async componentWillMount() {
    const { logout } = this.props
    await logout()
  }

  render() {
    return (
      <Redirect to='/login' />
    )
  }
}

Logout.propTypes = {
  logout: PropTypes.func
}

const mapState = state => ({
  // 
})

const mapDispatch = dispatch => ({
  logout: dispatch.User.logout
})

export default connect(mapState, mapDispatch)(Logout)
