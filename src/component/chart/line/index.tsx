import React, { FunctionComponent } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


interface PropsType {
    title: string;
    series: NodeType[];
}

interface NodeType {
    name: string;
    data: number[];
}

const Main:FunctionComponent<PropsType> = (props) => {
    const options = {
        chart: {
          type: 'spline'
        },
        title: {
          text: props.title
        },
        series: props.series,
        credits: false,

    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Main;