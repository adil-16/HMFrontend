import React from "react";
import Dots from "../../assets/dashboard/Dots.svg";
import user from "../../assets/sidebar/userIcon.svg"

const dashboardCard = ({ data }) => {
  return (
    <div className="bg-orange rounded-lg m-1.5 w-full xm:32 smm:w-64 ">
    <div className="w-full">
      <div className="flex items-between p-3 w-full ">
        <div className="flex-1">
          <div className="flex">
            <img src={user} />
            <p className="font-Nunitoo font-regular text-12 text-white ml-2">
              {data.name}
            </p>
          </div>
        </div>
          <img src={Dots} />
      </div>

      {/* figures */}
      <div className="flex p-3 items-center">
      <p className="font-Nunitoo font-regular text-24 text-white mx-2">
              {data.number}
            </p>
      </div>
    </div>
    </div>
  );
};

export default dashboardCard;
