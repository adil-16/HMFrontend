import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import SemiCirclePieChart from "../chart/SemiCircleChart";
import ChartBottom from "../chart/ChartBottom";

const ReportCard = ({rooms}) => {
  
  return (
    <div className="bg-black border border-white rounded-lg p-4 m-4 mr-10 mdd:mr-4 w-full">
      <div className="flex flex-wrap justify-between items-center ">
      <p className="font-sans font-semibold  text-orange text-24 mx-4  ">
        Total Users
      </p>
      
      </div>

            {/* pie chart */}
            <div className="flex justify-center">
            <SemiCirclePieChart rooms={rooms} />
            </div>

            <div className="mb-4" style={{ marginTop: "-60px" }}>
                <ChartBottom name={rooms[0]?.name} number={rooms[0]?.number} bg="#FFB668" />
                <ChartBottom name={rooms[1]?.name} number={rooms[1]?.number} bg="#ff690b" />
            </div>

           
    </div>
  );
};

export default ReportCard;
