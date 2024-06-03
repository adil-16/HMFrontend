import React, { useEffect } from "react";

const ChartBottom = ({name, bg, number}) => {
  useEffect(()=>{console.log("bg is", bg)},[])
  return (
    <div className="flex pb-5 pt-2 mx-6 justify-between border-b">
      <div>
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full`}
          style={{ backgroundColor: bg }}></div>
          <p className="font-Nunitoo text-14 font-regular text-blue4 ml-2">
            {name}
          </p>
        </div>
      </div>
      <p className="font-Nunitoo text-15 font-medium text-blue5 ml-2">
        {number}
      </p>
    </div>
  );
};

export default ChartBottom;
