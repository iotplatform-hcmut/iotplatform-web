import { ReactNode, FunctionComponent } from "react";
import {
    CloseCircleOutlined,
    HomeOutlined,
    ControlOutlined,
    TeamOutlined,
    FileAddOutlined
} from '@ant-design/icons';

import PageHome from 'src/page/dashboard'
import Page404 from 'src/page/404'
import PageControl from 'src/page/control/home'
import PageAbout from 'src/page/about'
import PageAdd from 'src/page/control/create'

export const THEME: 'light' | 'dark' = 'dark'
const PREFIX: string = ''

export const LIST_ROUTE: IRoute[] = [
    {
        key: 'home',
        name: 'Home',
        icon: HomeOutlined,
        page: PageHome,
    },
    {
        key: '404',
        name: '404',
        icon: CloseCircleOutlined,
        page: Page404,
        isHide: true,
        isNotAuth: false,
    },
    {
        key: 'Control',
        name: 'Control',
        icon: ControlOutlined,
        page: PageControl,
        isHide: false,
        isNotAuth: false
    },
    {
        key: 'Addnewmotor',
        name: 'Manager',
        icon: FileAddOutlined,
        page: PageAdd,
        isHide: false,
        isNotAuth: false
    },
    {
        key: 'About',
        name: 'About',
        icon: TeamOutlined,
        page: PageAbout,
        isHide: false,
        isNotAuth: false
    }
]

export interface IRoute {
    key: string,
    name: string
    icon: ReactNode
    path?: string,
    isHide?: boolean,
    isNotAuth?: boolean,
    listRoute?: IRoute[]
    page?: FunctionComponent
}

export const MAP_ROUTE: { [key: string]: IRoute; } = {}

const buildPath = (listRouteCur: IRoute[], prefixCur: string): void => {
    for (const routeThis of listRouteCur) {
        const key: string = routeThis.key
        const listRouteThis: IRoute[] | undefined = routeThis.listRoute
        const path: string = `${prefixCur}/${key}`
        if (listRouteThis) {
            buildPath(listRouteThis, path)
        }
        routeThis.path = path
        MAP_ROUTE[key] = routeThis
    }
}

buildPath(LIST_ROUTE, PREFIX)