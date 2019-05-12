import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from '../../components/PrivateRoute'
import Login from '../Login'
import Logout from '../Logout'
import Home from '../Home'
import NotFound from '../NotFound'

import 'antd/dist/antd.css'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/logout' exact component={Logout} />
        <PrivateRoute path='/home' exact component={Home} />
        <Route path='/not-found' exact component={NotFound} />
        <Redirect from='/' to='/home' exact />
        <Redirect to='/not-found' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
