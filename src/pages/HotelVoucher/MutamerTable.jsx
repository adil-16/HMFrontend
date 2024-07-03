import React from "react";

const MutamerTable = ({ data }) => {
  return (
    <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto">
      <table className="w-full">
        <thead className="bg-white3 ml-2 p-4 bg-orange">
          <tr className="font-sans p-6 h-7">
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
              SNO
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Passport
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Mutamer Name
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              G
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Nationality
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              PAX
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Bed
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              MOFA #
            </th>
            <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
              Visa #
            </th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {data?.map((val, ind) => {
            return (
              <tr className="border-b border-blue5" key={ind}>
                {/* cell 2 */}
                <td className="pl-2 font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.sno}
                </td>
                {/* 3rd cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {val.passport}
                </td>
                {/* 4th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.name}
                </td>
                {/* 5th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.gender}
                </td>
                {/* 6th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.nationality}
                </td>
                {/* 7th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.pax}
                </td>
                {/* 8th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.bed}
                </td>
                {/* 9th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.visa}
                </td>
                {/* 10th cell */}
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                  {val.mofa}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MutamerTable;
