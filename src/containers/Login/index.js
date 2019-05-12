import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Input,
  Button,
  Typography,
  Icon,
  message,
} from 'antd'

const { Title } = Typography;

const BackgroundDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #002140;
`

const LoginDiv = styled.div`
  width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MarginCol = styled(Col)`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Login extends Component {
  state = {
    username: undefined,
    password: undefined,
    loading: false
  }

  onInputChange = (key, input) => {
    this.setState({ [key]: input.target.value })
  }

  resetState = () => {
    this.setState({
      username: '',
      password: '',
      loading: false
    })
  }

  onLogin = async () => {
    try {
      const { username, password } = this.state
      const { login } = this.props
      await this.setState({ loading: true })
      await login({
        username,
        password
      })
    } catch(error) {
      message.error('Oops something went wrong')
    } finally {
      this.resetState()
    }
  }

  render() {
    const { username, password, loading } = this.state
    return (
      <BackgroundDiv>
        <LoginDiv>
          <Row>
            <MarginCol>
              <Title level={3}>E-Commerce Admin</Title>
            </MarginCol>
            <MarginCol>
              <Input
                autoFocus
                placeholder="Username"
                value={username}
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                disabled={loading}
                required
                onChange={data => this.onInputChange('username', data)}
              />
            </MarginCol>
            <MarginCol style={{ marginTop: 20 }}>
              <Input.Password
                placeholder="Password"
                value={password}
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                disabled={loading}
                required
                onPressEnter={this.onLogin}
                onChange={data => this.onInputChange('password', data)}
              />
            </MarginCol>
            <MarginCol>
              <Icon
                type="loading"
                spin
                style={{ fontSize: 24, color: loading ? '#000' : '#fff' }}
              />
            </MarginCol>
            <MarginCol>
              <Button type='primary' block disabled={loading} onClick={this.onLogin}>
                Login
              </Button>
            </MarginCol>
          </Row>
        </LoginDiv>
      </BackgroundDiv>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func
}

const mapState = state => ({
  // 
})

const mapDispatch = dispatch => ({
  login: dispatch.User.login
})

export default connect(mapState, mapDispatch)(Login)
