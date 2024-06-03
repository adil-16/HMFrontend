import React, { Component } from 'react';
import ApexCharts from 'apexcharts';

class SemiCirclePieChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = null;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rooms !== this.props.rooms) {
      this.renderChart();
    }
  }

  renderChart() {
    if (!this.props.rooms || this.props.rooms.length < 2) {
      return;
    }

    const chartOptions = {
      series: [this.props.rooms[0].number,this.props.rooms[1].number,],
      colors: ["#FFB668", "#ff690b"],
      chart: {
        height: 270,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Nunito",
                offsetY: 10,
              },
              total: {
                showAlways: true,
                show: true,
                label: "Users by device",
                fontFamily: "Nunito",
                fontSize: "14px",
                color:"#7E89AC",
                formatter: (w) => {
                  const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return sum;
                },
              },
              value: {
                show: true,
                fontFamily: "Nunito",
                fontSize: "36px",
                color: "white",
                offsetY: -30,
                formatter: (value) => value,
              },
            },
            size: "90%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        y: {
          formatter: (value) => `${value}`,
        },
        marker: {
          show: true,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };

    if (this.chart) {
      this.chart.updateOptions(chartOptions);
    } else {
      this.chart = new ApexCharts(this.chartRef.current, chartOptions);
      this.chart.render();
    }
  }

  render() {
    return <div ref={this.chartRef} />;
  }
}

export default SemiCirclePieChart;
