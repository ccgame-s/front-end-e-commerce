import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Logout extends Component {
  async componentWillMount() {
    const { logout } = this.props
    await logout()
  }

  render() {
    return <h1>This is Logout container</h1>
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
