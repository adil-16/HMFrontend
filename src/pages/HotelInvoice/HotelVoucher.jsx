import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../components/bars/TopBar";
import HotelVoucherTop from "./HotelVoucherTop";
import AccomodationTable from "./AccomodationTable";
import TransportTable from "./TransportTable";
import ServiceTable from "./ServiceTable";
import TopTable from "./TopTableInvoice";
import CostTable from "./CostTable";
import FinancialTable from "./FinancialTable";


const transportData = [
  {
    bankName: "Riyad Bank",
    accName: "Saif Al Masi",
    accNum: "1012412551",
    iban: "SA1241242154151325",
    swiftCode: "RIBLSARI",
  },
];






const generateVoucherNumber = (index) => {
  return `UB-${index + 1}`;
};

const HotelInvoice = () => {
  const location = useLocation();
  const { voucher, accomodationsData, count, printDate, guest} = location.state || {};
  const[costDataa, setCostData] = useState();
  const [confirmationNumber, setConfirmationNumber] = useState(1);


  console.log("invoice data", voucher)

  const topTableData = [
    {
      confirmationNum: confirmationNumber.toString(),
      confirmationStatus: voucher?.voucher?.confirmationStatus || voucher?.confirmationStatus,
      confType: voucher?.voucher?.confirmationType || voucher?.confirmationType,
      createdOn: printDate,
      docType: "Customer Copy",
    },
  ];

  const costData = [
    {
      roomCost: 991.3,
      munTax: 0,
      totalCost: 991.3,
      vat: 148.7,
      netCost: costDataa,
      otherServ: 0,
      finalCost: costDataa,
    },
  ];


  const costCallback = (data) => {
    setCostData(data);
  }
  



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
      meal: "R.O",
      roomQuantity: roomQuantity,
      roomRate: accommodation.rate,
      checkin: accommodation.checkin,
      checkout: accommodation.checkout,
      nights: nightDifference,
    };
  });

  useEffect(() => {
    setConfirmationNumber((prevNumber) => prevNumber + 1);
  }, []);
  

  return (
    <div className="w-full flex flex-col pb">
      <TopBar title="Package Invoice" />

      <div className="mt-5 ml-4 mr-8">
      <TopTable data={topTableData} />
      </div>

      <div className="p-1 sm:p-4 py-6">
        <HotelVoucherTop headName={voucher.customer.name} voucher={voucher} count= {count} guest= {guest} />

        <h3 className="text-orange font-medium mb-2 mt-5">Hotel Room Details</h3>
        <AccomodationTable data={accomodationData} handleCost = {costCallback} />

        <div className="mb-2 mt-10">
        <ServiceTable />
        </div>

        <div className="mb-2 mt-8">
        <CostTable data = {costData} />
        </div>

        <h3 className="text-orange font-medium mb-2 mt-5">Bank Account Information</h3>
        <TransportTable data={transportData} />

        <h3 className="text-orange font-medium mb-2 mt-5">Financial Transactions Summary</h3>
        <FinancialTable data={costDataa} />
      </div>

      <div className="mt-5 ml-4 text-20">
        <p className="underline text-orange">Option Date :</p>
        <p className="underline text-white">Please confirm your request on or before option date, otherwise your request will be cancelled</p>
        <p className="underline text-white">without further notification as per the company policy.</p>
      </div>
      <p className="mt-4 ml-4 text-16 text-white">Booking cannot be cancelled or refunded</p>
    </div>
  );
};

export default HotelInvoice;