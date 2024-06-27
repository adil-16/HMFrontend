import React from 'react'

const TransportTable = ({data}) => {
    return (
        <div className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto truncate">
          <table className="w-full">
            <thead className="bg-white3 ml-2 p-4 bg-orange">
              <tr className="font-sans p-6 h-7">
                <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 pl-2">
                  Room Cost
                </th>
                <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
                    Mun. Tax
                </th>
                <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
                    Total Cost
                </th>
                <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
                    15% VAT
                </th>
                <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
                    Net Cost
                </th>
                <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
                    Other Services
                </th>
                <th className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 ">
                    Final Cost
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
                      {val.roomCost}
                    </td>
                    {/* 3rd cell */}
                    <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                      {val.munTax}
                    </td>
                    {/* 4th cell */}
                    <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                      {val.totalCost}
                    </td>
                    {/* 5th cell */}
                    <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                      {val.vat}
                    </td>
                    <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                      {val.netCost}
                    </td>
                    <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                      {val.otherServ}
                    </td>
                    <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                      {val.finalCost}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
}

export default TransportTable
