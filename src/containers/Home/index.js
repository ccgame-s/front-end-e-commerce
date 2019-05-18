import React, { PureComponent } from 'react'
import { Layout, Menu, Icon, Typography } from 'antd'
import styled from 'styled-components'

import Logout from '../Logout'
import ProductList from '../ProductList'

const { Content, Footer, Sider } = Layout
const { Title } = Typography

const Logo = styled.div`
  background-color: #002140;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`

const Background = styled.div`
  padding: 24px;
  background-color: #fff;
  min-height: 360px;
  ${({ center }) => center && `
    display: flex;
    justify-content: center;
    align-items: center;`
  }
`

const menuItems = [
  {
    key: 'home',
    icon: 'home',
    label: 'Home'
  },
  {
    key: 'products',
    icon: 'unordered-list',
    label: 'Products',
    component: ProductList
  },
  {
    key: 'logout',
    icon: 'logout',
    label: 'Logout',
    component: Logout
  }
]

class Home extends PureComponent {
  state = {
    Component: null
  }

  onMenuClick = (component) => {
    this.setState({ Component: component })
  }

  render() {
    const { Component } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Logo>E-Commerce Admin</Logo>
          <Menu theme='dark' defaultSelectedKeys={['home']}>
            {
              menuItems.map(item => (
                <Menu.Item key={item.key} onClick={() => this.onMenuClick(item.component)}>
                  <Icon type={item.icon}/>
                  <span>{item.label}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: 16 }}>
            {
              Component ? (
                <Background>
                  <Component />
                </Background>
              ) : (
                <Background center>
                  <Title level={2}>Welcome to E-Commerce Admin</Title>
                </Background>
              )
            }
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by ccgame</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Home
