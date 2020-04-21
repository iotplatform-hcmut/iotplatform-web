import React, { FunctionComponent } from 'react'
import { Menu, Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom"
import 'src/layout/App/Header/style.css'


const Main: FunctionComponent = () => {
  const history = useHistory()

  const goLogin = (): void => {
    history.push('/login')
  }

  const MenuHeaderDropdown = (
    <Menu selectedKeys={[]} onClick={goLogin}>
      <Menu.Item key="logout">
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className='app-layout-header'>
      <Dropdown 
        className='app-layout-header__dropdown-menu' 
        overlay={MenuHeaderDropdown}>
          <div>Account</div>
      </Dropdown>
    </header>
  )
}

export default Main