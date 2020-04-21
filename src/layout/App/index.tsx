import React, {
    FunctionComponent,
} from 'react'
import Header from 'src/layout/App/Header'
import Footer from 'src/layout/App/Footer'
import SideBar from 'src/layout/App/SideBar'
import { Layout } from 'antd'
import auth from 'src/container/firebase'
import 'src/layout/App/style.css'
import { Redirect } from 'react-router-dom'
interface IProp {
    keyActive: string
}

const Main: FunctionComponent<IProp> = ({ children, keyActive }) => {
    return auth.currentUser ?
        (
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
            </section>
        )
        :
        (
            <Redirect to='/login' />
        )
}

export default Main