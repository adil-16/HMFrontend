import React from "react";
import Dots from "../../assets/dashboard/Dots.svg";
import user from "../../assets/sidebar/userIcon.svg";

const DashboardCard = ({ data }) => {
  return (
    <div className="bg-orange rounded-lg m-1.5 flex-1 w-full h-48 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div className="w-full">
        <div className="flex items-between p-3 w-full">
          <div className="flex-1">
            <div className="flex">
              <img src={user} alt="User icon" />
              <p className="font-Nunitoo text-2xl font-regular text-white ml-2">
                {data.name}
              </p>
            </div>
          </div>
          <img src={Dots} alt="Dots" />
        </div>

        <div className="flex p-3 items-center">
          <p className="font-Nunitoo font-regular text-3xl text-white mx-2">
            {data.number}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
