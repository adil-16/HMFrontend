import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import HotelCard from "./HotelCard";
import axios from "../../axios";

const InventoryReport = () => {
  const [data, setData] = useState([]);
  const [addHotel, setAddHotel] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("room");
  useEffect(() => {
    const getHotels = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/hotel/inventoryInfo", {
          params: { date },
        });
        console.log(res.data)
        setData(res.data.data.inventoryInfo);
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    getHotels();
  }, [date]);

  return (
    <div className="w-full">
      <TopBar title="Inventory Report" />
      {/* body */}
      <div className="p-1 sm:p-4 py-6">
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="room">Room</option>
            <option value="bed">Bed</option>
            {/* Add more room types as needed */}
          </select>
        </div>
        {
            (loading==true)?
            <div>Loading</div>:
            <div className="flex flex-wrap justify-start gap-10 m-1">
          
          {data?.length === 0 ? (
            <p className="text-center text-gray-500">No Hotels to show</p>
          ) : (
            data?.map((val, ind) => (
              <HotelCard
                type = {type}
                data={val}
                key={val.id || ind}
                setBook={()=>{}}
                setHotelId={()=>{}}
              />
            ))
          )}
        </div>
        }
        
      </div>

    </div>
  );
};

export default InventoryReport;
