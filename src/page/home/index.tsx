import React from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const Main = () => {
  return (
      <Typography>
        <Title>Introduction</Title>
        <Paragraph>
          XAdmin provides the privilege you need to manipulate XSystem. Given the authority, you accept responsibility for creating value to serve user needs.
            </Paragraph>
        <Title>Credit</Title>
        <Paragraph>
          <ul>
            <li>
              <a href='https://github.com/ant-design/ant-design-pro/'>Ant Design Pro v4</a>
            </li>
            <li>
              <a href='https://www.highcharts.com/'>Highcharts</a>
            </li>
          </ul>
        </Paragraph>
      </Typography>
  )
}


export default Main