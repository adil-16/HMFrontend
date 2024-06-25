import React, { useEffect, useState } from "react";

const AccomodationTable = ({ data }) => {
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let totalNights = 0;
    let totalAmt = 0;

    data.forEach((val) => {
      totalNights += parseInt(val.nights);
      const amount = parseInt(val.roomQuantity) * parseFloat(val.roomRate) * totalNights;
      totalAmt += amount;
    });

    setNights(totalNights);
    setTotalAmount(totalAmt);
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
              Room Type
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Room Quantity
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Room Rate
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Total Amount
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
          {data.map((val, ind) => {
            const totalAmt = parseInt(val.roomQuantity) * parseFloat(val.roomRate);

            return (
              <tr className="border-b border-blue5" key={ind}>
                <td className="pl-2 font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.hotel}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.roomType}
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
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.checkin}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.checkout}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.nights}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full flex flex-row justify-end gap-x-1.5 items-center py-4 sm:pr-5 pr-3">
        <p className="font-bold text-darkGray text-14 sm:text-16 ">
          Total Amount:
        </p>
        <p className="font-medium text-white text-14 sm:text-16 mr-8">{totalAmount.toFixed(2)}</p>
        <p className="font-bold text-darkGray text-14 sm:text-16">
          Total Accommodations:
        </p>
        <p className="font-medium text-white text-14 sm:text-16">{nights}</p>
        
      </div>
    </div>
  );
};

export default AccomodationTable;
