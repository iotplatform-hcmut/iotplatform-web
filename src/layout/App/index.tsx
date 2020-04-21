import React, {
    FunctionComponent,
} from 'react'
import Header from 'src/layout/App/Header'
import Footer from 'src/layout/App/Footer'
import SideBar from 'src/layout/App/SideBar'
import { Layout } from 'antd'
import 'src/layout/App/style.css'

interface IProp {
    keyActive: string
}

const Main: FunctionComponent<IProp> = ({ children, keyActive }) => {
    return (
        <section className='app-layout'>
            <SideBar keyActive={keyActive} />
            <section className='app-layout-section'>
                <React.StrictMode>
                    <Header />
                    <Layout
                        className='app-layout-content'
                    >
                        {children}
                    </Layout>
                </React.StrictMode>
                <Footer />
            </section>
        </section>)
}

export default Main