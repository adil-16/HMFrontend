import React, { useState } from "react";
import TopBar from "../../components/bars/TopBar";
import { LedgerTable } from "../../components/table/Table";
import LedgerTop from "./RoomLedgerTop";
import { useLocation } from "react-router-dom";

const Ledger = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { hotelName = "N/A", printDate = "N/A" } = location.state || {};

  const [tableHeader, setTableHeader] = useState([
    "Date",
    "Day",
    "Cost",
    "Selling Price",
    "Booking",
  ]);

  return (
    <div className="w-full">
      <TopBar title="Room Ledger Report" />
      <div className="p-1 sm:p-8 py-6">
        <LedgerTop
          hotelName={hotelName}
          roomNumber="0312156"
          roomType="Double"
          printDate={printDate}
        />
        <div className="mx-1">
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
