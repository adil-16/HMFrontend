import React from "react";

const AccomodationTable = () => {

  return (
    <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto truncate">
      <table className="w-full">
        <thead className="bg-white3 ml-2 p-4 bg-orange">
          <tr className="font-sans p-6 h-7">
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
              Service Company
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Service Name
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Start Date
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              End Date
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
              Other Serv. Total
            </th>
          </tr>
        </thead>
       
      </table>

    </div>
  );
};

export default AccomodationTable;
