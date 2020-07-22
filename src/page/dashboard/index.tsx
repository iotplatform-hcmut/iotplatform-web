import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Dropdown, DatePicker, InputNumber, Button, Menu, Checkbox } from "antd";
import LineChart, { NodeType } from "src/component/chart/line";
import HumidityApi, { HumidityDataType, SensorInformation } from "src/service/iotapi";
import { DownCircleOutlined } from "@ant-design/icons";
import ValueForm from "./components/ValueForm";
import GaugeChart from "src/component/chart/gauge";
import moment from "moment";

const Main: React.FunctionComponent = () => {
  const [series, setSeries] = useState<NodeType[]>([]);
  const [visible, setVisible] = useState(false);
  const [limit, setLimit] = useState(100)
  const [startTime, setStartTime] = useState(moment(moment.now() - 2592000000));
  const [endTime, setEndTime] = useState(moment(moment.now()));
  const [sensors, setSensors] = useState<SensorInformation[]>()
  const [checked, setChecked] = useState<boolean[]>()


  const onSubmit = () => {
    (async () => {
      if (sensors != null && checked != null && sensors.length && checked?.length) {
        const series: HumidityDataType[] = await HumidityApi.get
          .getValueByDeviceId(sensors.map((sensor, idx) => checked[idx] ? sensor.id : ""), limit, startTime.unix(), endTime.unix());
        setSensors(sensors);
        setChecked(checked);
        setSeries(series);
      }

      console.log(startTime.unix())

    })();
  }

  useEffect(() => {
    (async () => {
      const sensors: SensorInformation[] = await HumidityApi.get.getSensorInfomation();
      const checked: boolean[] = new Array(sensors.length).fill(true);
      const series: HumidityDataType[] = await HumidityApi.get.getValueByDeviceId(
        sensors.map(sensor => sensor.id), 100, startTime.unix(), endTime.unix());
      setSensors(sensors);
      setChecked(checked);
      setSeries(series);
    })();
  }, [endTime, startTime]);

  const currAvg = series.reduce((sum, s) => sum + s.data[s.data.length - 1], 0) / series.length / 10.23;
  const max = series.reduce((sum, s) => Math.max(...s.data) > sum ? Math.max(...s.data) : sum, 0) / 10.23;
  const min = series.reduce((sum, s) => Math.min(...s.data) < sum ? Math.min(...s.data) : sum, 10.23);
  const avg = series.reduce((sum, s) => sum + s.data.reduce((a, b) => a + b, 0), 0) / (series.length * 4) / 10.23;

  console.log(currAvg)
  console.log(max)
  console.log(min)
  console.log(avg)


  return (
    <div style={{ overflowY: 'scroll' }}>
      <Card style={{ marginBottom: 10 }}>
        <Form layout="inline">
          <Form.Item label="Device: ">
            <Dropdown.Button

              icon={<DownCircleOutlined />}
              overlay={

                <Menu style={{ width: 200 }}>
                  {
                    sensors != null ?
                      sensors.map(
                        (ele, idx) => (
                          <Menu.Item key={ele.id}>
                            <Checkbox
                              onClick={(e) => { if (checked != null) checked[idx] = !checked[idx]; setChecked(checked) }}
                              defaultChecked={true}
                            >
                              {ele.position}
                            </Checkbox>
                          </Menu.Item>
                        )
                      )
                      :
                      <></>
                  }
                </Menu>
              }
              visible={visible}
              onVisibleChange={(flag) => setVisible(flag)}
            >
              Select Device
          </Dropdown.Button>
          </Form.Item>
          <Form.Item label="Start Time: ">
            <DatePicker onChange={e => { if (e != null) setStartTime(e); }} defaultValue={startTime} />
          </Form.Item>
          <Form.Item label="End Time: ">
            <DatePicker onChange={e => { if (e != null) setEndTime(e) }} defaultValue={endTime} />
          </Form.Item>
          <Form.Item label="Limit: ">
            <InputNumber onChange={e => { if (e != null) setLimit(e) }} defaultValue={limit} />
          </Form.Item>
          <Form.Item style={{ alignItems: "right" }}>
            <Button type="primary" onClick={onSubmit}>Submit</Button>
          </Form.Item>
        </Form>
      </Card>
      <Row>
        <Col span={6}>
          <GaugeChart title="Humidity" value={currAvg ? currAvg : 30} />
        </Col>

        <Col span={18}>
          <Card>
            <LineChart
              title="Humidity Chart"
              xaxis="Time(hour)"
              yaxis="Humidity(0-1023)"
              series={series}
            />
          </Card>
        </Col>
      </Row>

      <ValueForm title="Summary" min={min ? min : 10} max={max ? max : 90} avg={avg ? avg : 50} />
    </div>
  );
};

export default Main;
