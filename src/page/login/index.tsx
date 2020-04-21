import { Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import 'src/page/login/style.css'
import { doSignInWithEmailAndPassword } from 'src/container/firebase/Auth';
import { useHistory } from 'react-router-dom';

const Main: React.FunctionComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMess, setErrorMess] = useState('')
    const history = useHistory()

    const onLogin = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {

        doSignInWithEmailAndPassword(username, password)
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
                        <Button type="primary" htmlType="submit" onClick={onLogin}>
                            Login
                    </Button>
                    </Form.Item>
                </Form>
                <p>{errorMess}</p>
            </div>

        </div>
    );
};

export default Main
