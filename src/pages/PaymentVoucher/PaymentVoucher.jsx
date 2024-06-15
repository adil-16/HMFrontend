import React from "react";
import TopBar from "../../components/bars/TopBar";
import AccommodationTable from "./AccommodationTable";

const accomodationData = [
  {
    city: "Makkah",
    hotel: "Rushad al majd /Similar",
    view: "standard",
    meal: "RO",
    conf: "123456",
    roomType: "double bed",
    nights: "8",
    rooms: "2",
    beds: "3",
    payable: "500",
  },
  {
    city: "Makkah",
    hotel: "Rushad al majd /Similar",
    view: "standard",
    meal: "RO",
    conf: "123456",
    roomType: "double bed",
    rooms: "2",
    beds: "2",
    nights: "8",
    payable: "500",
  },
  {
    city: "Makkah",
    hotel: "Rushad al majd /Similar",
    view: "standard",
    meal: "RO",
    rooms: "2",
    conf: "123456",
    roomType: "double bed",
    nights: "8",
    beds: "2",
    payable: "500",
  },
];

const PaymentVoucher = () => {
  return (
    <div className="w-full flex flex-col pb-5">
      <TopBar title="Payment Voucher" />

      <div className="p-1 sm:p-4 py-6">
        <h3 className="text-orange font-medium mb-2 mt-5">Accommodations</h3>
        <AccommodationTable data={accomodationData} />
      </div>
    </div>
  );
};

export default PaymentVoucher;
