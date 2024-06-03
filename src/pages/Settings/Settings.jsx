import React from "react";
import TopBar from "../../components/bars/TopBar";
import SettingForm from "../../components/forms/SettingForm";

const Settings = () => {
  // Get the current date
  const currentDate = new Date();

  // Define months array
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date
  const formattedDate = `${
    months[currentDate.getMonth()]
  } ${currentDate.getDate()} ${currentDate.getFullYear()}`;

  return (
    <div className="w-full">
      <TopBar title="Settings" />
      {/* body */}
      <div className="p-1 sm:p-4 py-6">
        <p className="font-Nunitoo text-orange font-semibold text-16 sm:text-24">
          Welcome Admin
        </p>
        <p className="font-Nunitoo text-orange font-regular text-12">{formattedDate}</p>

        <div className="mr-4 lg:mr-80">
          <SettingForm />
        </div>
      </div>
    </div>
  );
};

export default Settings;
