import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
// import DataLoader from "../../Loader/DashboardLoader";
const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;

  // Define the height of the transparent line at the top of the bar
  const transparentLineHeight = 10;

  return (
    <g>
      {/* Rounded rectangle */}
      <rect
        x={x}
        y={y}
        width={width + 3}
        height={height - transparentLineHeight}
        rx={5}
        ry={5}
        fill={fill}
      />

      {/* Transparent line at the top */}
      <rect
        x={x}
        y={y}
        width={width + 3}
        height={transparentLineHeight}
        fill="#F0F0F0"
      />
    </g>
  );
};

const BarChartt = ({ usersData, screenWidth }) => {
  // Calculate 75% of the screenWidth
  const chartWidth = screenWidth * 0.76;

  return (
    <div className="w-full ">
          <BarChart
            data={usersData}
            width={chartWidth}
            height={
              screenWidth > 1400
                ? screenWidth / 8
                : screenWidth > 991
                ? screenWidth / 7
                : screenWidth > 767
                ? screenWidth / 6
                : screenWidth / 5
            }
            className="pr-7"
          >
            <XAxis
              dataKey="roomType"
              tickLine={false}
              axisLine={false}
              stroke="orange"
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              stroke="orange"
            />
            <Bar
              dataKey="count"
              shape={<CustomBar />}
              fill="#FF6C22"
              barSize={chartWidth / 190}
            />
          </BarChart>
       
    </div>
  );
};

export default BarChartt;
