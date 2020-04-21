import { ReactNode, FunctionComponent } from "react";
import {
    CloseCircleOutlined,
    HomeOutlined,
} from '@ant-design/icons';

import PageHome from 'src/page/home'
import Page404 from 'src/page/404'

export const THEME: 'light' | 'dark' = 'light'
const PREFIX: string = ''

export const LIST_ROUTE: IRoute[] = [
    {
        key: 'home',
        name: 'Home',
        icon: HomeOutlined,
        page: PageHome,
        // isHide: false,
    },
    {
        key: '404',
        name: '404',
        icon: CloseCircleOutlined,
        page: Page404,
        // isHide: false,
    },
]

export interface IRoute {
    key: string,
    name: string
    icon: ReactNode
    path?: string,
    isHide?: boolean,
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