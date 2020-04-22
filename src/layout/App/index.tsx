import React, {
    FunctionComponent, useEffect, useState,
} from 'react'
import Header from 'src/layout/App/Header'
import Footer from 'src/layout/App/Footer'
import SideBar from 'src/layout/App/SideBar'
import { Layout } from 'antd'
import auth from 'src/container/firebase'
import 'src/layout/App/style.css'
import { useHistory } from 'react-router-dom'
interface IProp {
    keyActive: string
}

const Main: FunctionComponent<IProp> = ({ children, keyActive }) => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState(auth.currentUser)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user)
            } else {
                history.push('/login')
            }
        });
    })

    return currentUser ?
        (
            <section className='app-layout'>
                <SideBar keyActive={keyActive} />
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
        )
        :
        (
            <></>
        )
}

export default Main