import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Form, InputNumber, Card, Checkbox, Slider } from 'antd';
import HumidityApi, { MotorInformation, ReturnMessage, HistoryInformation } from 'src/service/iotapi'
import moment from 'moment';
import '../style.css'



const Main: React.FunctionComponent = () => {
    const [motor, setMotors] = useState<MotorInformation[]>([]);
    const [history, setHistory] = useState<HistoryInformation[]>([]);
    const [checked, setChecked] = useState<boolean[]>()
    const [value, setValue] = useState(450)

    useEffect(() => {
        (async () => {
            const motorInfo: MotorInformation[] = await HumidityApi.get.getMotorInformation()
            const historyInfo: HistoryInformation[] = await HumidityApi.get.getAllHistory()
            for (let i = 0; i < motorInfo.length; i++) { motorInfo[i].sth = i }
            setMotors(motorInfo)
            setHistory(historyInfo)
            setChecked(new Array(motorInfo.length).fill(false))
        })()
    }, []);

    const onControl = () => {
        (async () => {
            const lsDevice = motor.map((item, idx) => checked != null ? checked[idx] ? item.id : "" : "").filter(e => e !== '')
            const messge: ReturnMessage = await HumidityApi.get.pushMQTT(lsDevice, 1, value)
            if (messge.status === "ok") alert("Success")
            else alert("fail")
        })()
    }
    const historyColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: React.ReactNode) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Date',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp: number) => moment(timestamp * 1000).format("DD-MM-YYYY")
        },
        {
            title: 'Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp: number) => moment(timestamp * 1000).format("HH-MM-SS")
        },
        {
            title: 'Water Level',
            dataIndex: 'value',
            key: 'value'
        },
    ]

    const motorColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: React.ReactNode) => <Tag color="blue">{text}</Tag>,
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
            render: (relay: number) => moment(relay * 1000).format("DD-MM-YYYY")
        },
        {
            title: 'Chose',
            dataIndex: 'sth',
            key: 'sth',
            render: (sth: number) => <Checkbox
                onChange={() => { if (checked != null) checked[sth] = !checked[sth] }}
                value={checked != null ? checked[sth] : false}></Checkbox>
        },
    ]

    return (
        <div>
            <Card>
                <Form
                    layout="inline"
                >
                    <Form.Item> Please, Select motors and water level respectively! </Form.Item>

                    <Form.Item>
                        <Slider
                            min={0}
                            max={1023}
                            style={{ width: 300, scrollbarColor: "gray" }}
                            value={value}
                            onChange={(e) => { if (e != null) setValue(parseInt(e.toString())) }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <InputNumber
                            min={0}
                            max={1023}
                            style={{ margin: '0 16px' }}
                            value={value}
                            onChange={(e) => { if (e != null) setValue(e) }}
                        />
                    </Form.Item>
                    <Form.Item style={{ alignItems: "right" }}>
                        <Button type="primary" onClick={onControl}>Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Table
                tableLayout="fixed"
                columns={motorColumns}
                dataSource={motor}
            >
            </Table>
            <Table
                tableLayout="fixed"
                columns={historyColumns}
                dataSource={history}
            >
            </Table>
        </div >
    )
};

export default Main
