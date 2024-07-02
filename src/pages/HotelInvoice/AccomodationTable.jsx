import React, { useEffect, useState } from "react";

const AccomodationTable = ({ data, handleCost }) => {
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let totalNights = 0;
    let totalAmt = 0;

    data?.forEach((val) => {
      totalNights += parseInt(val.nights);
      const amount = parseInt(val.roomQuantity) * parseFloat(val.roomRate) * parseInt(val.nights);
      totalAmt += amount;
    });

    setNights(totalNights);
    setTotalAmount(totalAmt);
    handleCost(totalAmt.toFixed(2)); // Pass the correctly calculated totalAmt
  }, [data]);

  return (
    <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto truncate">
      <table className="w-full">
        <thead className="bg-white3 ml-2 p-4 bg-orange">
          <tr className="font-sans p-6 h-7">
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
              Hotel Name
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Room Info
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Meals
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Checkin
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Checkout
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Nts
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Qty
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Rate
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val, ind) => {
            const totalAmt = parseInt(val.roomQuantity) * parseFloat(val.roomRate) * parseInt(val.nights);

            return (
              <tr className="border-b border-blue5" key={ind}>
                <td className="pl-2 font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.hotel}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.roomType} bed
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.meal}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.checkin}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.checkout}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.nights}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.roomQuantity}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.roomRate}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {totalAmt.toFixed(2)} {/* Display totalAmount for each row */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccomodationTable;
