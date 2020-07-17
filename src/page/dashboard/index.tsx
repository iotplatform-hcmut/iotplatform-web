import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "antd";
import LineChart, { NodeType } from "src/component/chart/line";
import HumidityApi, { HumidityDataType } from "src/service/humidity";
import OptionForm from "./components/OptionForm";
import ValueForm from "./components/ValueForm";
import GaugeChart from "src/component/chart/gauge";

const Main: React.FunctionComponent = () => {
  const [series, setSeries] = useState<NodeType[]>([]);

  useEffect(() => {
    (async () => {
      const data: HumidityDataType[] = await HumidityApi.get.getValueByDeviceId(["d0_1", "d0_2"], 10);
      setSeries(data);
    })();
  }, []);

  const currAvg = series.reduce((sum, s) => sum + s.data[s.data.length - 1], 0) / series.length;
  const max = series.reduce((sum, s) => Math.max(...s.data) > sum ? Math.max(...s.data) : sum, 0);
  const min = series.reduce((sum, s) => Math.min(...s.data) < sum ? Math.min(...s.data) : sum, 1023);
  const avg = series.reduce((sum, s) => sum + s.data.reduce((a, b) => a + b, 0), 0) / series.length;



  return (
    <>
      <OptionForm />
      <Row>
        <Col span={6}>
          <GaugeChart title="Humidity" value={currAvg} />
        </Col>

        <Col span={18}>
          <Card>
            <LineChart
              title="Humidity Chart"
              xaxis="Time(hour)"
              yaxis="Humidity(%)"
              series={series}
            />
          </Card>
        </Col>
      </Row>

      <ValueForm title="Summary" min={min} max={max} avg={avg} />
    </>
  );
};

export default Main;
