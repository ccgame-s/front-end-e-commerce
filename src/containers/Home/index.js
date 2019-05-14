import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import styled from 'styled-components'

const { Content, Footer, Sider } = Layout

const Logo = styled.div`
  background-color: #002140;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`

class Home extends Component {
  gotoLogout = () => {
    window.location = '/logout'
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Logo>E-Commerce Admin</Logo>
          <Menu theme='dark' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='home' />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key='2' onClick={this.gotoLogout}>
              <Icon type='logout' />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: 16 }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by ccgame</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Home
