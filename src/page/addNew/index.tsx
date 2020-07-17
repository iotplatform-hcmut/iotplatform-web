import React, { useState } from 'react'
import { Form, Input, Button, Space } from 'antd';
import HumidityApi, { ReturnMessage } from 'src/service/humidity'


const Main: React.FunctionComponent = () => {
  const [position, setPosition] = useState<string>("")
  const [description, setDecription] = useState<string>("")
  const [id, setId] = useState<string>("")

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onReset = () => {
    setId("")
    setPosition("")
    setDecription("")
  };

  const onSubmit = () => {
    (async () => {
      const message: ReturnMessage = await HumidityApi.post.addMotor(id, position, description)
      if (message.status === "ok") {
        alert("create motor successful")
      }
      else {
        alert("create motor fail")
      }
    })()
  }

  return (
    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
      <Form.Item name={['user', 'id']} label="Motor Id" rules={[{ required: true }]}>
        <Input onChange={e => setId(e.target.value)} value={id} />
      </Form.Item>
      <Form.Item name={['user', 'position']} label="Position" rules={[{ required: true }]}>
        <Input onChange={e => setPosition(e.target.value)} value={position} />
      </Form.Item>
      <Form.Item name={['user', 'description']} label="Description" rules={[{ required: true }]}>
        <Input.TextArea onChange={e => setDecription(e.target.value)} value={description} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space size="middle">
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Submit
            </Button>

          <Button htmlType="button" onClick={onReset}>
            Reset
            </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Main
