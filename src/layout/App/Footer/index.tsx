import React, { FunctionComponent } from 'react'


const imagePath:string = 'https://static-zmp3.zadn.vn/skins/zmp3-v5.2/images/bg-miniplayer-v1.png'

const Main: FunctionComponent = () => {
  return (
    <div
      style={{
        padding: '10px 0',
        textAlign: 'center',
        background: '#9b59b6',
        color: '#ecf0f1',
        fontWeight: 700,
        fontSize: '18px',
        bottom: 0,
        width: '100%',
        left: 0,
        backgroundImage: `url(${imagePath})`,
        backgroundColor: '#1d1924',
      }}
    >
      <p>2020 Copyright © by  ZMedia Data</p>
    </div>
  )
}

export default Main