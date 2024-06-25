import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


export default function PieChartt({ usersData, screenWidth }) {
  // Define an array of shades of orange
  const colors = ["#FFFFFF", "#FFAA45"];


  return (
    <div className="w-auto md:w-full border border-white rounded-lg m-4">
     <p className="font-sans font-semibold  text-orange text-24 m-4  ml-16">
        Booked Beds
      </p>
     

    <PieChart
      width={screenWidth > 991 ? screenWidth / 3.9 : screenWidth / 1.3}
      height={
        screenWidth > 1400
          ? screenWidth / 8
          : screenWidth > 991
          ? screenWidth / 7
          : screenWidth > 767
          ? screenWidth / 6
          : screenWidth / 5
      }
    >
      <Pie
        data={usersData}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={screenWidth > 991 ? "60%" : "100%"}
        label
      >
        {usersData?.map((entry, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </div>
  );
}
