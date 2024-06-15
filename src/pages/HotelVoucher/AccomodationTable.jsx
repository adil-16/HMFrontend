import React, { useEffect, useState } from "react";

const AccomodationTable = ({ data }) => {
  const [nights, setNights] = useState(0);

  useEffect(() => {
    let total = 0;
    data.forEach((val) => {
      total += parseInt(val.nights);
    });
    setNights(total);
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
              Checkin
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Checkout
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
                  {val.checkin}
                </td>
                {/* 9th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.checkout}
                </td>
                {/* 10th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.nights}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full flex flex-row justify-end gap-x-1.5 items-center py-4 sm:pr-5 pr-3">
        <p className="font-bold text-darkGray text-14 sm:text-16">
          Total Nights:
        </p>
        <p className="font-medium text-white text-14 sm:text-16">{nights}</p>
      </div>
    </div>
  );
};

export default AccomodationTable;
