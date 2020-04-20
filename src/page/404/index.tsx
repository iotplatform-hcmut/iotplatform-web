import { Button, Result } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

const Main: React.FunctionComponent = () => {
  const history = useHistory()

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => history.push('/')}>
          <HomeOutlined /> 
          Home
      </Button>
      }
    />
  )
}

export default Main
