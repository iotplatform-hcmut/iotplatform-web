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
      const d1_1: HumidityDataType = await HumidityApi.get.getValueByDeviceId(
        "Mois",
        10
      );
      setSeries([d1_1]);
    })();
  }, []);

  return (
    <>
      <OptionForm />
      <Row>
        <Col span={6}>
          <GaugeChart title="Min" value="10%" />
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

      <ValueForm title="Summary" min="10%" max="20%" avg="15%" />
    </>
  );
};

export default Main;
