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
  const [roomData, setRoomData] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const {
    hotelName = "N/A",
    printDate = "N/A",
    hotelId = undefined,
    room = undefined,
  } = location.state || {};

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/ledger/roomLedger/${hotelId}/${room._id}`)
      .then((res) => {
        console.log(res.data);
        setRoomData(res.data);
        setOriginalData(res.data.roomLedger);
        setData(res.data.roomLedger);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [hotelId, room._id]);

  const [tableHeader, setTableHeader] = useState([
    "Booking Date",
    "Cost",
    "Sale",
    "Profit/(Loss)",
    "Status",
  ]);

  return (
    <div className="w-full">
      <TopBar title="Room Profit and Loss Report" />
      <div className="p-1 sm:p-8 py-6">
        <LedgerTop
          hotelName={hotelName}
          roomNumber={room.roomNumber}
          roomType={room.type}
          printDate={printDate}
          roomData={roomData}
        />
        <DateRange rows={originalData} setRows={setData} />
        <div className="mx-1 mt-6 overflow-hidden">
          <LedgerTable
            tableHeader={tableHeader}
            data={data}
            setData={setData}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Ledger;
