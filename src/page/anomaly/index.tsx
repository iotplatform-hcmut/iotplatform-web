import React, { useEffect, useState } from 'react'
import LineChart, { NodeType } from "src/component/chart/line";
import HumidityApi, { AnomalyInfomattion } from 'src/service/iotapi'
import { Card, Row, Col } from 'antd';

const Main: React.FunctionComponent = () => {
    const [origin, setOrigin] = useState<NodeType[]>([]);
    const [season, setSeason] = useState<NodeType[]>([]);
    const [trend, setTrend] = useState<NodeType[]>([]);
    const [residual, setResidual] = useState<NodeType[]>([]);

    useEffect(() => {
        (async () => {
            const anomalyInfo: AnomalyInfomattion = await HumidityApi.get.getAnomaly()
            setOrigin([{ name: "origin", data: anomalyInfo.origin }])
            setSeason([{ name: "season", data: anomalyInfo.season }])
            setTrend([{ name: "trend", data: anomalyInfo.trend }])
            setResidual([{ name: "resid", data: anomalyInfo.residual }])
        })()
    }, [])

    return (
        <div style={{ overflowY: 'scroll' }}>
            <Row>
                <Col span={12}>
                    <Card>
                        <LineChart
                            title="Origin Chart"
                            xaxis="Time(hour)"
                            yaxis="Humidity(0-1023)"
                            series={origin}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <LineChart
                            title="Season Chart"
                            xaxis="Time(hour)"
                            yaxis="Humidity(0-1023)"
                            series={season}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Card>
                        <LineChart
                            title="Trend Chart"
                            xaxis="Time(hour)"
                            yaxis="Humidity(0-1023)"
                            series={trend}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <LineChart
                            title="Resid Chart"
                            xaxis="Time(hour)"
                            yaxis="Humidity(0-1023)"
                            series={residual}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Main
