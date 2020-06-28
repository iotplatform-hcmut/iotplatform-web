import React, { FunctionComponent } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface PropsType {
  title: string;
  xaxis: string;
  yaxis: string;
  series: NodeType[];
}

export interface NodeType {
  name: string;
  data: number[];
}

const Main: FunctionComponent<PropsType> = (props) => {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: props.title,
    },
    xAxis: {
      title: {
        text: props.xaxis,
      },
    },
    yAxis: {
      title: {
        text: props.yaxis,
      },
    },
    series: props.series,
    credits: false,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Main;
