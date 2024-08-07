import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import { LedgerTable } from "./RoomLedgerTable";
import LedgerTop from "./RoomLedgerTop";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import DateRange from "../../components/Date/DateRange";

const Ledger = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const location = useLocation();
  const {
    hotelName = "N/A",
    printDate = "N/A",
    hotelId = undefined,
    room = undefined,
  } = location.state || {};

  useEffect(() => {
    axios.get(`/ledger/roomLedger/${hotelId}/${room._id}`).then((res) => {
      console.log(res.data.roomLedger);
      setOriginalData(res.data.roomLedger);
      setData(res.data.roomLedger);
    });
  }, []);

  const [tableHeader, setTableHeader] = useState([
    "Date",
    "Cost",
    "Selling Price",
    "Profit",
    "Booking",
  ]);

  return (
    <div className="w-full">
      <TopBar title="Room Ledger Report" />
      <div className="p-1 sm:p-8 py-6">
        <LedgerTop
          hotelName={hotelName}
          roomNumber={room.roomNumber}
          roomType={room.type}
          printDate={printDate}
        />
        <DateRange rows={originalData} setRows={setData} />
        <div className="mx-1 mt-6">
          <LedgerTable
            tableHeader={tableHeader}
            data={data}
            setData={setData}
          />
        </div>
      </div>
    </div>
  );
};

export default Ledger;
