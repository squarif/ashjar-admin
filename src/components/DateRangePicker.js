import React from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const App = () => (
    <Space direction="vertical" size={12}>
        <RangePicker showTime />
        <RangePicker picker="week" />
        <RangePicker picker="month" />
        <RangePicker picker="quarter" />
        <RangePicker picker="year" />
    </Space>
);
export default App;
