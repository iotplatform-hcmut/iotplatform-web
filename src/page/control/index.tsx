import React, { useEffect, useState } from 'react'
import 'src/page/control/style.css'
import { Col, Table, Row, Tag, Space, Button, Modal, Form, Input, InputNumber } from 'antd';
import HumidityApi, { MotorInformation, ReturnMessage } from 'src/service/humidity'
import moment from 'moment';
import './style.css'
import FormItemInput from 'antd/lib/form/FormItemInput';

interface Motor {
    id: string
    url: string
    event?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const listMotor: Motor[] = [
    { id: "1", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "2", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "3", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "4", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "5", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
]

interface MotorImage {
    event?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    id: string,
    url: string
}

const Main: React.FunctionComponent = () => {
    const [data, setData] = useState<MotorInformation[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [waterValue, setWaterValue] = useState<number>()
    const [motorId, setMotorId] = useState<string>("")

    const showModal = (id: string) => () => {
        setVisible(true)
        setMotorId(id)
    };

    useEffect(() => {
        (async () => {
            const motorInfo: MotorInformation[] = await HumidityApi.get.getMotorInformation()
            setData(motorInfo)
            for (let i = 0; i < listMotor.length; ++i) {
                listMotor[i]["event"] = () => {
                    setVisible(true)
                };
            }
        })()
    }, []);

    const onDeleteMotor = (id: string) => () => {
        (async () => {
            const message: ReturnMessage = await HumidityApi.delete.deleteMotor(id);
            if (message.status === "ok") {
                alert("delete motor successful")
            }
            else {
                alert("delete motor fail")
            }
            setData(data.filter(e => e.id != id))
        })()
    }

    const handleSubmit = () => {
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false)
    };


    const dataColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: React.ReactNode) => <a>{text}</a>,
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
                if (state == false) {
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
            render: (relay: number) => moment(relay).format("DD-MM-YYYY")
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

    return (
        <div>
            {
                (() => {
                    const listImage = []
                    for (let i = 0; i < Math.ceil(listMotor.length / 3); ++i) {
                        listImage.push(
                            // <MotorImage key={i} lsMotor={listMotor.slice(3 * i, 3 * i + 3)} ></MotorImage>
                            <Row>
                                {
                                    listMotor.slice(3 * i, 3 * i + 3).map((e: MotorImage) => (
                                        <Col span={8} key={e.id}>
                                            <div>
                                                <p> MÁY BƠM NƯỚC SỐ {e.id}</p>
                                                <Form>
                                                    <img
                                                        src={e.url}
                                                        width="200"
                                                        height="150"
                                                    />
                                                </Form>
                                                <Button
                                                    type="primary"
                                                    htmlType="button"
                                                    onClick={showModal(e.id)}
                                                >
                                                    Bật Máy bơm
                                                </Button>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        )
                    }
                    return listImage
                })()
            }
            <div className="app-control">
                <Table
                    tableLayout="fixed"
                    columns={dataColumns}
                    dataSource={data}
                >
                </Table>
                <Modal
                    visible={visible}
                    onOk={handleSubmit}
                    onCancel={handleCancel}
                >
                    <Form>
                        <p> MÁY BƠM SỐ {motorId}</p>
                        <p> Điền lượng nước muốn bơm vào ôm bên dưới (0 -> 1023):</p>
                        <Form.Item name={['motor', 'value']} label="Water value" rules={[{ required: true }]}>
                            <InputNumber min={0} max={1023} defaultValue={0}
                                onChange={() => setWaterValue(waterValue)} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
};

export default Main

