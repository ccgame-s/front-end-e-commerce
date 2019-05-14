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

const menuItems = [
  {
    key: 'home',
    icon: 'home',
    label: 'Home',
  },
  {
    key: 'logout',
    icon: 'logout',
    label: 'Logout',
    link: '/logout'
  }
]

class Home extends Component {
  gotoLink = link => {
    if(link) {
      window.location = link
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Logo>E-Commerce Admin</Logo>
          <Menu theme='dark' defaultSelectedKeys={['home']}>
            {
              menuItems.map(item => (
                <Menu.Item key={item.key} onClick={() => this.gotoLink(item.link)}>
                  <Icon type={item.icon}/>
                  <span>{item.label}</span>
                </Menu.Item>
              ))
            }
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
