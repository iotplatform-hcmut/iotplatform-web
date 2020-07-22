import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Space, Card, DatePicker, Switch, Row, Col, Table, Tag } from 'antd';
import HumidityApi, { ReturnMessage, MotorInformation } from 'src/service/iotapi'
import moment from 'moment';



const Main: React.FunctionComponent = () => {
  const [position, setPosition] = useState<string>("")
  const [description, setDecription] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [relay, setRelay] = useState(moment(moment.now()))
  const [state, setState] = useState(true)
  const [motor, setMotors] = useState<MotorInformation[]>([]);

  useEffect(() => {
    (async () => {
      const motorInfo: MotorInformation[] = await HumidityApi.get.getMotorInformation()
      setMotors(motorInfo)
    })()
  }, []);

  const dataColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text: React.ReactNode) => <Tag color="blue">{text}</Tag  >,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (state: boolean) => {
        let stateColor: string
        let stateText: string
        if (state === false) {
          stateColor = "volcano"
          stateText = "OFF"
        }
        else {
          stateColor = "green"
          stateText = "ON"
        }

        return (
          <Tag
            color={stateColor}
            key={stateText}
          >
            {stateText.toUpperCase()}
          </Tag>
        )
      }
    },
    {
      title: 'Relay',
      dataIndex: 'relay',
      key: 'relay',
      render: (e: number) => moment(e * 1000).format("DD-MM-YYYY")
    },
    {
      title: "Action",
      key: "action",
      render: (motor: any) => (
        <Space size="middle">
          <Button
            type="primary"
            htmlType="button"
            color="pink"
            onClick={onDeleteMotor(motor.id)}>
            Delete
                </Button>
        </Space>
      )
    }
  ]

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onReset = () => {
    window.location.reload();
  };

  const onDeleteMotor = (id: string) => () => {
    (async () => {
      const message: ReturnMessage = await HumidityApi.delete.deleteMotor(id);
      if (message.status === "ok") {
        alert("Delete motor successful")
      }
      else {
        alert("Delete motor fail")
      }
      setMotors(motor.filter(e => e.id !== id))
    })()
  }

  const onCreate = () => {
    (async () => {
      const message: ReturnMessage = await HumidityApi.post.addMotor(id, position, description, state, relay.unix())
      if (message.status === "ok") {
        alert("Create motor successful!");
        (async () => {
          const motorInfo: MotorInformation[] = await HumidityApi.get.getMotorInformation()
          setMotors(motorInfo)
        })()
      }
      else {
        alert("Create motor fail!")
      }
    })()
  }

  return (
    <div style={{ overflowY: 'scroll' }}>
      <Card>
        <Form {...layout} name="nest-messages" >
          <Form.Item name={['user', 'id']} label="Motor Id" rules={[{ required: true }]}>
            <Input onChange={e => setId(e.target.value)} value={id} />
          </Form.Item>
          <Form.Item name={['user', 'position']} label="Position" rules={[{ required: true }]}>
            <Input onChange={e => setPosition(e.target.value)} value={position} />
          </Form.Item>
          <Form.Item name={['user', 'description']} label="Description" rules={[{ required: true }]}>
            <Input.TextArea onChange={e => setDecription(e.target.value)} value={description} />
          </Form.Item>
          <Row style={{ marginLeft: 350, marginRight: 400 }}>
            <Col span="15">
              <Form.Item label="Relay Time: ">
                <DatePicker onChange={e => { if (e != null) setRelay(e) }} defaultValue={relay} />
              </Form.Item>
            </Col>
            <Col span="9">
              <Form.Item label="State: ">
                <Switch checked={state} onClick={_ => setState(!state)} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item {...tailLayout}>
            <Space size="middle">
              <Button type="primary" htmlType="submit" onClick={onCreate}>
                Create
            </Button>

              <Button htmlType="button" onClick={onReset}>
                Reset
            </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table
          tableLayout="fixed"
          columns={dataColumns}
          dataSource={motor}
        >
        </Table>
      </Card>
    </div>
  );
};

export default Main
