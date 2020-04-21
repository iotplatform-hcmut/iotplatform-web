import { Form, Input, Button } from 'antd';
import React from 'react';
import 'src/page/login/style.css'

const Main: React.FunctionComponent = () => {

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
                //   onFinish={}
                //   onFinishFailed={}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                    </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
};

export default Main
