import React from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../components/bars/TopBar";
import HotelVoucherTop from "./HotelVoucherTop";
import MutamerTable from "./MutamerTable";
import AccomodationTable from "./AccomodationTable";
import TransportTable from "./TransportTable";
import ArrivalTable from "./ArrivalTable";


const transportData = [
  {
    transporter: "Economy by Bus",
    type: "Makkah to Madinah",
    description: "0",
    brn: "1",
    adult: "2",
    child: "0",
    amount: "0",

  },
  {
    transporter: "Economy by Bus",
    type: "Makkah to Madinah",
    description: "0",
    brn: "1",
    adult: "2",
    child: "0",
    amount: "0",
  },
];


const generateVoucherNumber = (index) => {
  return `UB-${index + 1}`;
};

const HotelInvoice = () => {
  const location = useLocation();
  const { voucher, accomodationsData } = location.state || {};
  

  console.log("invoice data", accomodationsData)

  if (!voucher) {
    return <div>No voucher data found</div>;
  }
  

  const accomodationData = accomodationsData?.map((accommodation) => {
    const checkinDate = new Date(accommodation.checkin);
    const checkoutDate = new Date(accommodation.checkout);
    const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
    const nightDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); 
  
    const roomQuantity = accommodation.roomQuantity ? accommodation.roomQuantity : 1;

    return {
      hotel: accommodation.hotel,
      roomType: accommodation.roomType,
      roomQuantity: roomQuantity,
      roomRate: accommodation.rate,
      checkin: accommodation.checkin,
      checkout: accommodation.checkout,
      nights: nightDifference,
    };
  });
  

  return (
    <div className="w-full flex flex-col pb-5">
      <TopBar title="Package Invoice" />

      <div className="p-1 sm:p-4 py-6">
        <HotelVoucherTop headName={voucher.customer.name} voucher={generateVoucherNumber(0)} />

        <h3 className="text-orange font-medium mb-2 mt-5">Accommodations</h3>
        <AccomodationTable data={accomodationData} />

        <h3 className="text-orange font-medium mb-2 mt-5">Transport Service</h3>
        <TransportTable data={transportData} />
      </div>
    </div>
  );
};

export default HotelInvoice;