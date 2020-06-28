import React, { useEffect, useState } from 'react'
import 'src/page/control/style.css'
import { Col, Table, Row, Tag, Space, Button } from 'antd';
import MotorForm from 'src/component/form'
import HumidityApi, { MotorInformation, ReturnMessage } from 'src/service/humidity'
import moment from 'moment';
import humidity from 'src/service/humidity';
import MotorImage from './components/MotorImage'

const listMotor = [
    { id: "1", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "2", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "3", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "4", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
    { id: "5", url: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" },
]

const Main: React.FunctionComponent = () => {
    const [data, setData] = useState<MotorInformation[]>([]);

    useEffect(() => {
        (async () => {
            const motorInfo: MotorInformation[] = await HumidityApi.get.getMotorInformation()
            setData(motorInfo)
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
                        listImage.push(<MotorImage lsMotor={listMotor.slice(3 * i, 3 * i + 3)} ></MotorImage>)
                    }
                    return listImage
                })()
            }
            <div>
                <Table
                    tableLayout="fixed"
                    columns={dataColumns}
                    dataSource={data}
                >
                </Table>
            </div>
        </div>
    )
};

export default Main

