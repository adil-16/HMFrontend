import React, { useEffect, useState } from "react";
import BarChartt from "./BarChart";

const Graphs = ({rooms}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
 
  return (
    <div className="flex flex-col flex-wrap md:flex-row mt-8 justify-between">
      <div className="flex flex-col bg-black border border-white rounded-lg ring-1 ring-black ring-opacity-5 w-full mx-4">
        <p className="font-sans font-semibold text-orange text-24 m-4">Total Beds</p>

        <BarChartt usersData={rooms} screenWidth={screenWidth} />
      </div>
     
    </div>
  );
};

export default Graphs;
