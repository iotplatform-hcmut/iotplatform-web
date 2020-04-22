import { Form, Input, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import 'src/page/login/style.css'
import auth, { provider } from 'src/container/firebase'
import { useHistory } from 'react-router-dom';
import {
    GoogleOutlined,
    GithubOutlined,
}
    from '@ant-design/icons'

const Main: React.FunctionComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMess, setErrorMess] = useState('')
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            alert("You have signed in")
            if (user) history.push('/home')
        });
        return () => {
            
        }
    }, [history])


    const onLoginEmail = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                setUsername('')
                setPassword('')
                history.push('/home');
            })
            .catch(error => {
                setErrorMess(error.message)
            });
        event.preventDefault();
    };

    const onLoginGoogle = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        auth.signInWithPopup(provider.google)
            .then(() => {
                setUsername('')
                setPassword('')
                history.push('/home');
            })
            .catch(error => {
                setErrorMess(error.message)
            });
        event.preventDefault();
    };

    const onLoginGithub = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        auth.signInWithPopup(provider.github)
            .then(() => {
                setUsername('')
                setPassword('')
                history.push('/home');
            })
            .catch(error => {
                setErrorMess(error.message)
            });
        event.preventDefault();
    };

    return (
        <div>
            <img
                className='login-page-logo' alt='Z Media Data'
                src="https://static-zmp3.zadn.vn/skins/zmp3-v5.2/images/logo-mp-3.svg"
            />

            <div className='login-page-form'>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange={e => { setUsername(e.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={e => { setPassword(e.target.value) }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={onLoginEmail}>
                            Login
                        </Button>

                        <Button style={{ color: 'black', fontWeight: 500, marginLeft: '100px' }}
                            type="link" shape="circle" icon={<GoogleOutlined />}
                            onClick={onLoginGoogle}>
                            Google
                        </Button>

                        <Button style={{ color: 'black', fontWeight: 500, marginLeft: '100px' }}
                            type="link" shape="circle" icon={<GithubOutlined />}
                            onClick={onLoginGithub}>
                            Github
                        </Button>

                    </Form.Item>
                </Form>
                <p>{errorMess}</p>
            </div>

        </div>
    );
};

export default Main
