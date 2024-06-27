import React from "react";

const AccomodationTable = ({ data }) => {

  return (
    <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto truncate">
      <table className="w-full">
        <thead className="bg-white3 ml-2 p-4 bg-orange">
          <tr className="font-sans p-6 h-7">
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
              Confirmation Number
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Confirmation Status
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Conf. Type
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Confirmation created on
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Document Copy
            </th>
            {/* <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Checkin
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Checkout
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Nights
            </th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((val, ind) => {
            const totalAmt = parseInt(val.roomQuantity) * parseFloat(val.roomRate);

            return (
              <tr className="border-b border-blue5" key={ind}>
                <td className="pl-2 font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.confirmationNum}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.confirmationStatus}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.confType}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.createdOn}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.docType}
                </td>
                {/* <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.checkin}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.checkout}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.nights}
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default AccomodationTable;
