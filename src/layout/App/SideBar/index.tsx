import 'src/layout/App/SideBar/style.css'
import { FunctionComponent, createElement, ReactNode, useState } from "react"
import SubMenu from "antd/lib/menu/SubMenu"
import React from "react"
import { Menu, Button } from "antd"
import { useHistory } from "react-router-dom"
import { ClickParam } from "antd/lib/menu"
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'

import { IRoute, MAP_ROUTE, THEME, LIST_ROUTE } from "src/config/route"

interface ITitle {
    name: string
    icon: ReactNode
}

interface IProp {
    keyActive: string
}

const Main: FunctionComponent<IProp> = ({ keyActive }) => {
    const history = useHistory()
    const [isMini, setIsMini] = useState(false)

    const goTab = (param: ClickParam): void => {
        const key: string = param.key
        const route: IRoute = MAP_ROUTE[key]
        const path: string | undefined = route.path
        if (path) {
            history.push(path)
        }
    }

    const goHome = (): void => {
        history.push('/')
    }

    const renderSubMenu = (route: IRoute): ReactNode => {
        const isHide: boolean | undefined = route.isHide
        if (isHide) {
            return
        }

        const listRoute: IRoute[] = route.listRoute as IRoute[]
        const name: string = route.name
        const icon: ReactNode = route.icon
        const key: string = route.key

        return (
            <SubMenu key={key} title={<Title name={name} icon={icon} />}>
                {listRoute.map((routeThis: IRoute) => {
                    const listRoute: IRoute[] | undefined = routeThis.listRoute
                    if (listRoute) {
                        return renderSubMenu(route)
                    }
                    const name: string = route.name
                    const icon: ReactNode = route.icon
                    const key: string = route.key
                    return (
                        <Menu.Item key={key}>
                            <Title name={name} icon={icon} />
                        </Menu.Item>
                    )
                })}
            </SubMenu>
        )
    }

    const renderMainMenu = (): ReactNode => {
        return <Menu
            theme={THEME}
            mode='inline'
            onClick={goTab}
            defaultSelectedKeys={[keyActive]}
        >
            {LIST_ROUTE.map((route: IRoute): ReactNode => {
                const isHide: boolean | undefined = route.isHide
                if (isHide) {
                    return undefined
                }
                const listRoute: IRoute[] | undefined = route.listRoute
                if (listRoute) {
                    return renderSubMenu(route)
                }
                const name: string = route.name
                const icon: ReactNode = route.icon
                const key: string = route.key
                return (
                    <Menu.Item key={key}>
                        <Title name={name} icon={icon} />
                    </Menu.Item>
                )
            })}
        </Menu>
    }

    const Title: FunctionComponent<ITitle> = ({ name, icon }) => {
        return (
            <div>
                {createElement(icon as FunctionComponent)}
                {isMini? undefined:name}
            </div>
        )
    }

    return (
        <aside
            className="app-layout-sidebar"
            style={{ width: isMini ? '65px' : '300px' }}
        >
            <header className='app-layout-logo'>
                {
                isMini
                ?
                (
                    <Button type="link" onClick={() => { setIsMini(!isMini) }}><DoubleRightOutlined /></Button>
                )
                :
                (
                    <>
                    <img
                    className='app-layout-logo__image'
                    src="https://static-zmp3.zadn.vn/skins/zmp3-v5.2/images/logo-mp-3.svg"
                    alt='Z Media Data' onClick={goHome} />

                    <Button type="link" onClick={() => { setIsMini(!isMini) }}><DoubleLeftOutlined /></Button>
                    </>
                )
                }
            </header>
            {renderMainMenu()}
        </aside>
    )
}

export default Main