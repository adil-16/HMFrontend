import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import { useLocation } from "react-router-dom";
import axios from "../../axios";

const WastageReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [roomType, setRoomType] = useState("Total");

  useEffect(() => {
    if (date) {
      setLoading(true);
      axios
        .get(`/hotel/wastageCollection`, {
          params: { date },
        })
        .then((res) => {
          setData(res.data.data.wastageCollection);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [date]);

  return (
    <div className="w-full">
      <TopBar title="Wastage Collection Report" />
      <div className="p-1 sm:p-8 py-6">
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Total">Total</option>
            <option value="Quint">Quint</option>
            <option value="Quad">Quad</option>
            <option value="Triple">Triple</option>
            <option value="Double">Double</option>
            {/* Add more room types as needed */}
          </select>
        </div>
        <div className="mx-1 mt-6 overflow-hidden">
          <WastageTable roomType = {roomType} data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

const WastageTable = ({ roomType, data, loading }) => {
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-4">
        <p className="text-white font-Nunitoo text-16">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto"
        style={{ minWidth: "350px", overflowX: "auto" }}
      >
        <table className="w-full">
          <thead className="bg-white3 bg-orange">
            <tr className="font-sans p-6">
              <th className="text-left sm:ml-4 font-Nunitoo text-12 text-lg py-8">
                Hotel Name
              </th>
              <th className="text-left sm:ml-4 font-Nunitoo text-12 text-lg py-8">
                Rooms
              </th>
              <th className="text-left sm:ml-4 font-Nunitoo text-12 text-lg py-8">
                Beds
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr className="border-b border-blue5" key={index}>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-12 whitespace-nowrap">
                    {item?.hotelName}
                  </td>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-12 whitespace-nowrap">
                    {item?.totalRoomsAvailable[roomType]}
                  </td>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-12 whitespace-nowrap">
                    {item?.totalBedsAvailable[roomType]}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WastageReport;