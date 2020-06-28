import React from "react";
import { Card, Descriptions } from "antd";

interface FormProps {
  title: string;
  max: string;
  min: string;
  avg: string;
}

const Main: React.FunctionComponent<FormProps> = (props) => {
  return (
    <Card style={{ marginTop: 10 }}>
      <Descriptions bordered title={props.title}>
        <Descriptions.Item label="Humidity Max">{props.max}</Descriptions.Item>
        <Descriptions.Item label="Humidity Min">{props.min}</Descriptions.Item>
        <Descriptions.Item label="Humidity Avg">{props.avg}</Descriptions.Item>
        <Descriptions.Item label="Status" style={{ color: "#336600" }}>
          Good
        </Descriptions.Item>
        <Descriptions.Item label="Status" style={{ color: "#ff0000" }}>
          Bad
        </Descriptions.Item>
        <Descriptions.Item label="Status" style={{ color: "#000000" }}>
          Normal
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Main;
