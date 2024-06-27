import React, { useEffect, useState } from "react";

const AccomodationTable = ({ data }) => {
 

  return (
    <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto truncate">
      <table className="w-full">
        <thead className="bg-white3 ml-2 p-4 bg-orange">
          <tr className="font-sans p-6 h-7">
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
              Invoice #.
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Inv. Date
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Cashier
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Amount
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Remarks
            </th>            
          </tr>
        </thead>
      </table>

      <div className="w-full flex flex-row justify-end gap-x-1.5 items-center py-4 sm:pr-5 pr-3">
        <p className="font-bold text-darkGray text-14 sm:text-16 ">
          Total Amount:
        </p>
        <p className="font-medium text-white text-14 sm:text-16 mr-8">{data}</p>
        
      </div>
    </div>
  );
};

export default AccomodationTable;
