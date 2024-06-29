import React, { useEffect, useState } from "react";

const AccomodationTable = ({ data, title, handleShowVoucher }) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    title == "Arrival Intimation"
      ? setDate("Arrival Date")
      : setDate("Departure Date");
  }, [title]);

  return (
    <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto truncate">
      <table className="w-full">
        <thead className="bg-white3 ml-2 p-4 bg-orange">
          <tr className="font-sans p-6 h-7">
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
              Voucher Number
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Party
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              {date}
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Adult
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Child
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Infant
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, ind) => {
            const totalAmt =
              parseInt(val.roomQuantity) * parseFloat(val.roomRate);

            return (
              <tr className="border-b border-blue5" key={ind}>
                <td className="pl-2 font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.voucherNum}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.party}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.arrivalDate}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.adult}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.child}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.infant}
                </td>
                <td>
                <button className="bg-orange text-Nunitoo text-white h-10 flex justify-end" onClick={() => handleShowVoucher(val.id)}>Show Voucher</button>
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
