import React from 'react'
import 'src/page/control/style.css'
import { Form, Button, Col, Table, Row } from 'antd';
import { useHistory, Redirect } from 'react-router-dom'
import { triggerAsyncId } from 'async_hooks';


const Main: React.FunctionComponent  = () => {
    const history = useHistory()
    const columns = [
        {
            title: 'ID',
            dataIndex : 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            
        },
        {
            title: 'localtion',
            dataIndex: 'localtion',
            key:'localtion',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key:'status',
        },
    ];

    const rowsData=[
        {
            key : '1',
            id: '0001',
            name: 'may bom so 1',
            localtion: 'Quan 1',
            status: 'ON', 
        },
        {
            key : '2',
            id: '0002',
            name: 'may bom so 2',
            localtion: 'Quan 2',
            status: 'OFF', 
        },
        {
            key : '3',
            id: '0003',
            name: 'may bom so 3',
            localtion: 'Quan 3',
            status: 'OFF', 
        }, 
    ]
    return(
        <div>
            <Row>
                <Col span={8}><div 
                className = "first-device"
                >
                <p>MÁY BƠM NƯỚC SỐ 1</p>
                <img
                    className="water-pump-1"
                    title = "Máy bơm nước số 1"
                    alt="water pump 1"
                    src="https://cdn.nguyenkimmall.com/images/thumbnails/696/522/detailed/538/May-bom-nuoc-panasonic.jpg"
                    width = "200"
                    height = "150"
                />
                <Form>
                    <Form.Item>
                        <label
                            className = "device1_status"
                            color = "green"
                        >
                        </label>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            className = "button-device-1"
                            type="primary" 
                            htmlType="button"
                            >
                            Bật Máy bơm
                        </Button>
                    </Form.Item>
                </Form>
            </div></Col>
                <Col span={8}>
                <div 
                className = "second-device"
                >
                <p>MÁY BƠM NƯỚC SỐ 2</p>
                <img
                    className="water-pump-2"
                    title = "Máy bơm nước số 2"
                    alt="water pump 2"
                    src="https://cdn.nguyenkimmall.com/images/thumbnails/696/522/detailed/538/May-bom-nuoc-panasonic.jpg"
                    width = "200"
                    height = "150"           
                />
                <Form>
                    <Form.Item>
                        <label
                            className = "device1_status"
                            color = "green"
                        >
                        </label>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className = "button-device-2"                       
                            type="primary" 
                            htmlType="button"
                            >
                            Bật Máy bơm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
                </Col>
                <Col span={8}>
                <div 
                className = "third-device"
                >
                <p>MÁY BỚM NƯỚC SỐ 3</p>
                <img
                    className="water-pump-1"
                    title = "Máy bơm nước số 3"
                    alt="water pump 1"
                    src="https://cdn.nguyenkimmall.com/images/thumbnails/696/522/detailed/538/May-bom-nuoc-panasonic.jpg"
                    width = "200"
                    height = "150"
                />
                <Form>
                    <Form.Item>
                        <label
                            className = "device1_status"
                            color = "green"
                        >   
                        </label>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            className = "button-device-3"
                            type="primary" 
                            htmlType="button"
                            >
                            Bật Máy bơm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
                </Col>
            </Row>
        
            <div>   
                <Table 
                    columns={columns} 
                    dataSource = {rowsData}
                    >
                </Table>
            </div>
        </div>
    )
};

export default Main

