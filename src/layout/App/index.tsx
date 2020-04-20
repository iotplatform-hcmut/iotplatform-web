import React, {
    FunctionComponent,
} from 'react'
import Header from 'src/layout/App/Header'
import Footer from 'src/layout/App/Footer'
import { Layout } from 'antd'
import 'src/layout/App/style.css'

const Main: FunctionComponent = ({ children }) => {
    return <section className='app-layout'>
        <section className='app-layout-section'>
            <Header />
            <Layout
                className='app-layout-content'
            >
                {children}
            </Layout>
            <Footer />
        </section>
    </section>
}

export default Main