import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import LineChart from 'src/component/chart/line'
import HumidityApi, { HumidityDataType, WelcomeMessage } from 'src/service/humidity'

const { Title, Paragraph } = Typography

const Main: React.FunctionComponent  = () => {
  const [series, setSeries] = useState<HumidityDataType[]>([]);
  const [message,setMessage] = useState(""); 

  useEffect(() => {
    (async () => {
      const d1_1:HumidityDataType = await HumidityApi.get.getValueByDeviceId('d0_0', 3)
      const d2_1:HumidityDataType = await HumidityApi.get.getValueByDeviceId('d2_1', 10)
      setSeries([d1_1, d2_1])
      const team:WelcomeMessage = await HumidityApi.get.getWelcomeMessage()
      setMessage(team.Message);
    })()
  }, [])

  return (
      <Typography>
        <Title>Introduction</Title>
        <Paragraph> Web IOT theo dõi tình hình hạn mặn ở các tỉnh miền Tây Nam Bộ.</Paragraph>
        <p>{message}</p>

        <LineChart title="Humidity Chart" series={series}/>

        <Title>Members</Title>
        <Paragraph>
          <ul>
            <li>
              <a href='https://github.com/khoidohpc'>Đỗ Đăng Khôi</a>
            </li>
            <li>
              <a href='https://github.com/lenhatthanh100'>Lê Nhật Thành</a>
            </li>
            <li>
              <a href='https://github.com/datai999'>Nguyễn Đức Anh Tài</a>
            </li>
            <li>
              <a href='https://github.com/kietnguyen98'>Nguyễn Hàn Mạnh Kiệt</a>
            </li>
            <li>
              <a href='https://github.com/vanTamBachKhoa'>Trần Văn Tâm</a>
            </li>
          </ul>
        </Paragraph>
      </Typography>
  )
}

export default Main