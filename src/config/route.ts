import { ReactNode, FunctionComponent } from "react";
import {
    CloseCircleOutlined,
    HomeOutlined,
    ControlOutlined,
    TeamOutlined,
    FileAddOutlined,
    IssuesCloseOutlined
} from '@ant-design/icons';

import PageHome from 'src/page/dashboard'
import Page404 from 'src/page/404'
import PageMotorControl from 'src/page/control/home'
import PageMotorCreate from 'src/page/control/create'
import PageAnomaly from 'src/page/anomaly'
import PageAbout from 'src/page/about'


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
        key: 'ControlMotor',
        name: 'Control',
        icon: ControlOutlined,
        page: PageMotorControl,
        isHide: false,
        isNotAuth: false
    },
    {
        key: 'CreateMotor',
        name: 'Manager',
        icon: FileAddOutlined,
        page: PageMotorCreate,
        isHide: false,
        isNotAuth: false
    },
    {
        key: 'Anomaly',
        name: 'Anomaly',
        icon: IssuesCloseOutlined,
        page: PageAnomaly,
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