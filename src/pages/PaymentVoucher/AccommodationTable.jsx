import React, { useEffect, useState } from "react";

const AccommodationTable = ({ data }) => {
  const [nights, setNights] = useState(0);
  const [payable, setPayable] = useState(0);

  useEffect(() => {
    let total = 0;
    let totalPayable = 0;
    data.forEach((val) => {
      total += parseInt(val.nights);
      totalPayable += parseInt(val.payable);
    });
    setNights(total);
    setPayable(totalPayable);

    
  }, [data]);

  return (
    <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto truncate">
      <table className="w-full">
        <thead className="bg-white3 ml-2 p-4 bg-orange">
          <tr className="font-sans p-6 h-7">
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
              City
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Hotel Name
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              View
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Meal
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Conf #
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Room Type
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              no of rooms
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              no of beds
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              payble
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Nights
            </th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {data.map((val, ind) => {
            return (
              <tr className="border-b border-blue5" key={ind}>
                {/* cell 2 */}
                <td className="pl-2 font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.city}
                </td>
                {/* 3rd cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.hotel}
                </td>
                {/* 4th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.view}
                </td>
                {/* 5th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.meal}
                </td>
                {/* 6th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.conf}
                </td>
                {/* 7th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.roomType}
                </td>
                {/* 8th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.rooms}
                </td>
                {/* 9th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.beds}
                </td>
                {/* 10th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.payable}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.nights}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full flex flex-row justify-end gap-x-4 items-center py-4 sm:pr-5 pr-3">
        <div className="flex flex-row items-center gap-1.5">
          <p className="font-bold text-darkGray text-14 sm:text-16">
            Total Payables:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">{payable}</p>
        </div>
        <div className="flex flex-row items-center gap-1.5">
          <p className="font-bold text-darkGray text-14 sm:text-16">
            Total Nights:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">{nights}</p>
        </div>
      </div>
    </div>
  );
};

export default AccommodationTable;
