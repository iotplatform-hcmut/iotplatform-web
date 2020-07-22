import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import HumidityApi, { UserInformation } from 'src/service/iotapi'
import moment from 'moment';

const Main: React.FunctionComponent = () => {
    const [data, setData] = useState<UserInformation[]>([]);

    useEffect(() => {
        (async () => {
            const userInfo: UserInformation[] = await HumidityApi.get.getUserInformation()
            setData(userInfo)
        })()
    }, [])

    const dataColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (birthday: number) => moment(birthday * 1000).format("DD-MM-YYYY")
        },
    ]
    return (
        <div style={{ overflowY: 'scroll' }}>
            <Table
                columns={dataColumns}
                dataSource={data}
            >
            </Table>
        </div>
    )
}

export default Main
