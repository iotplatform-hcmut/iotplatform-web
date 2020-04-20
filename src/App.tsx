import React, { FunctionComponent, createElement } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { IRoute, MAP_ROUTE } from 'src/config/route'
import AppLayout from 'src/layout/App'

const renderRoute = (route: IRoute): JSX.Element => {
  const path: string = route.path as string
  const key: string = route.key
  const page: FunctionComponent = route.page as FunctionComponent
  return (
    <Route key={key} path={path} component={() => (
      <AppLayout keyActive={key}>
        {createElement(page)}
      </AppLayout>
    )} />
  )
}

const Main: FunctionComponent = () => (
  <Router>
    <Switch>
      <Redirect exact from='/' to='/admin/home' />
      {Object.values(MAP_ROUTE).map(renderRoute)}
      <Redirect to='/admin/404' />
    </Switch>
  </Router>
)

export default Main
