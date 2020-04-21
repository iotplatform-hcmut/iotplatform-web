import React, { FunctionComponent, createElement } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { IRoute, MAP_ROUTE } from 'src/config/route'
import AppLayout from 'src/layout/App'
import PageLogin from 'src/page/login'

const renderRoute = (route: IRoute): JSX.Element => {
  const path: string = route.path as string
  const key: string = route.key
  const page: FunctionComponent = route.page as FunctionComponent
  return (
    <Route key={key} path={path}>{
      () => (
        <AppLayout keyActive={key}>
          {createElement(page)}
        </AppLayout>
      )
    }</Route>
  )
}

const Main: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route key="login" path="/login">
        {createElement(PageLogin)}
      </Route>
      <Redirect exact from='/' to='/login' />
      {Object.values(MAP_ROUTE).map(renderRoute)}
      <Redirect to='/404' />
    </Switch>
  </Router>
)

export default Main
