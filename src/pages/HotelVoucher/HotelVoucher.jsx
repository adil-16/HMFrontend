import React from "react";
import TopBar from "../../components/bars/TopBar";
import HotelVoucherTop from "./HotelVoucherTop";
import MutamerTable from "./MutamerTable";
import AccomodationTable from "./AccomodationTable";
import TransportTable from "./TransportTable";
import ArrivalTable from "./ArrivalTable";

const mutamerData = [
  {
    sno: "1",
    passport: "123456789",
    name: "Mr. Abid Markazia",
    gender: "M",
    pax: "Adult",
    bed: "Yes",
    mofa: "1133456",
    visa: "123456",
    pnr: "123456",
  },
  {
    sno: "2",
    passport: "123456789",
    name: "Mr. Abid Mark",
    gender: "M",
    pax: "Adult",
    bed: "Yes",
    mofa: "1133456",
    visa: "123456",
    pnr: "123456",
  },
];

const accomodationData = [
  {
    city: "Makkah",
    hotel: "Rushad al majd /Similar",
    view: "standard",
    meal: "RO",
    conf: "123456",
    roomType: "double bed",
    checkin: "12-06-2024",
    checkout: "20-06-2024",
    nights: "8",
  },
  {
    city: "Makkah",
    hotel: "Rushad al majd /Similar",
    view: "standard",
    meal: "RO",
    conf: "123456",
    roomType: "double bed",
    checkin: "12-06-2024",
    checkout: "20-06-2024",
    nights: "8",
  },
  {
    city: "Makkah",
    hotel: "Rushad al majd /Similar",
    view: "standard",
    meal: "RO",
    conf: "123456",
    roomType: "double bed",
    checkin: "12-06-2024",
    checkout: "20-06-2024",
    nights: "8",
  },
];

const transportData = [
  {
    transporter: "company transport",
    type: "Economy by bus",
    description: "Makkah to Madinah",
    brn: "123456",
  },
  {
    transporter: "company transport",
    type: "Economy by bus",
    description: "Makkah to Madinah",
    brn: "123456",
  },
];

const departureData = [
  {
    flight: "PK-123",
    sector: "ISB-JED",
    departure: "12-06-2024",
    arrival: "12-06-2024",
  },
];

const arrivalData = [
  {
    flight: "PK-123",
    sector: "JED-ISB",
    departure: "12-06-2024",
    arrival: "12-06-2024",
  },
];

const HotelVoucher = () => {
  return (
    <div className="w-full flex flex-col pb-5">
      <TopBar title="Hotel Voucher" />

      <div className="p-1 sm:p-4 py-6">
        <HotelVoucherTop headName="Abid Markazia" voucher="V-12321" />

        <h3 className="text-orange font-medium mb-2">Mutamers</h3>
        <MutamerTable data={mutamerData} />

        <h3 className="text-orange font-medium mb-2 mt-5">Accommodations</h3>
        <AccomodationTable data={accomodationData} />

        <h3 className="text-orange font-medium mb-2 mt-5">Transport Service</h3>
        <TransportTable data={transportData} />

        <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-x-4">
          <div className="grid-cols-1 sm:grid-cols-2">
            <h3 className="text-orange font-medium mb-2 mt-5">
              Departure (PK to KSA)
            </h3>
            <ArrivalTable data={departureData} />
          </div>
          <div className="grid-cols-1 sm:grid-cols-2">
            <h3 className="text-orange font-medium mb-2 mt-5">
              Arrival (KSA to PK)
            </h3>
            <ArrivalTable data={arrivalData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelVoucher;
