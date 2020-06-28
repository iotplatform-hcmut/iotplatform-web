import React, { useEffect, useState } from 'react'
import MotorForm from 'src/component/form'
import { Row, Col } from 'antd'

const Main: React.FunctionComponent<Properties> = (props) => {

    return (
        <Row>
            {
                props.lsMotor.map((e: MotorImage) => (
                    <Col span={8}>
                        <MotorForm
                            id={e.id}
                            url={e.url}
                        >
                        </MotorForm>
                    </Col>
                ))
            }
        </Row>
    )
}

interface Properties {
    lsMotor: MotorImage[];
}

interface MotorImage {
    id: string,
    url: string
}

export default Main;