import React, { Component } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Typography, Icon } from 'antd'

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
`

class Login extends Component {
  state = {
    username: undefined,
    password: undefined
  }

  onInputChange = (key, input) => {
    this.setState({ [key]: input.target.value })
  }

  onLogin = async () => {
    try {
      const { username, password } = this.state
      const { login } = this.props
      const result = await login({
        username,
        password
      })
      console.log('result', result)
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    return (
      <BackgroundDiv>
        <LoginDiv>
          <Row>
            <MarginCol>
              <Title level={3}>E-Commerce Admin</Title>
            </MarginCol>
            <MarginCol>
              <Input
                placeholder="Username"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                required
                onChange={data => this.onInputChange('username', data)}
              />
            </MarginCol>
            <MarginCol style={{ marginTop: 20 }}>
              <Input.Password
                placeholder="Password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                required
                onChange={data => this.onInputChange('password', data)}
              />
            </MarginCol>
            <MarginCol>
              <Button type='primary' block onClick={this.onLogin}>Login</Button>
            </MarginCol>
          </Row>
        </LoginDiv>
      </BackgroundDiv>
    )
  }
}

const mapState = state => ({
  // 
})

const mapDispatch = dispatch => ({
  login: dispatch.User.login
})

export default connect(mapState, mapDispatch)(Login)
