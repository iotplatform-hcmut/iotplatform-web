import React, { useState } from "react";
import {
  Form,
  DatePicker,
  Card,
  InputNumber,
  Button,
  Checkbox,
  Menu,
  Dropdown,
} from "antd";
import { DownCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const menu = () => (
  <Menu style={{ width: 200 }}>
    <Menu.Item>
      <Checkbox>Device 1 (Tomato)</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>Device 2 (Watermelon)</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>Device 3 (Potato)</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>Device 4 (Strawberry)</Checkbox>
    </Menu.Item>
  </Menu>
);
const Main: React.FunctionComponent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Card style={{ marginBottom: 10 }}>
      <Form layout="inline">
        <Form.Item label="Device: ">
          <Dropdown.Button
            icon={<DownCircleOutlined />}
            overlay={menu}
            visible={visible}
            onVisibleChange={(flag) => setVisible(flag)}
          >
            Select Device
          </Dropdown.Button>
        </Form.Item>
        <Form.Item label="Start Time: ">
          <DatePicker defaultValue={moment(moment.now())} />
        </Form.Item>
        <Form.Item label="End Time: ">
          <DatePicker defaultValue={moment(moment.now() - 2592000000)} />
        </Form.Item>
        <Form.Item label="Limit: ">
          <InputNumber defaultValue={100} />
        </Form.Item>
        <Form.Item style={{ alignItems: "right" }}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Main;
