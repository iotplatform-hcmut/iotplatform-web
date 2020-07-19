import React from "react";
import { Card, Descriptions } from "antd";

interface FormProps {
  title: string;
  max: number;
  min: number;
  avg: number;
}

const measure = (val: number) => {
  if (val <= 20) return (
    <Descriptions.Item label="Status" style={{ color: "#336600" }}>
      Good
    </Descriptions.Item>
  ); else if (val <= 60) return (
    <Descriptions.Item label="Status" style={{ color: "#000000" }}>
      Normal
    </Descriptions.Item>
  ); else return (
    <Descriptions.Item label="Status" style={{ color: "#ff0000" }}>
      Bad
    </Descriptions.Item>)
}
const Main: React.FunctionComponent<FormProps> = (props) => {
  return (
    <Card style={{ marginTop: 10 }}>
      <Descriptions bordered title={props.title}>
        <Descriptions.Item label="Humidity Max">{`${props.max.toFixed(2)} %`}</Descriptions.Item>
        <Descriptions.Item label="Humidity Min">{`${props.min.toFixed(2)} %`}</Descriptions.Item>
        <Descriptions.Item label="Humidity Avg">{`${props.avg.toFixed(2)} %`}</Descriptions.Item>
        {measure(props.max)}
        {measure(props.min)}
        {measure(props.avg)}
      </Descriptions>
    </Card>
  );
};

export default Main;
