import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../../components/bars/TopBar";
import HotelVoucherTop from "./HotelVoucherTop";
import MutamerTable from "./MutamerTable";
import AccomodationTable from "./AccomodationTable";
import TransportTable from "./TransportTable";
import ArrivalTable from "./ArrivalTable";

const getPaxType = (age) => {
  if (age >= 0 && age <= 2) return "infant";
  if (age >= 3 && age <= 12) return "child";
  if (age > 12) return "adult";
  return "unknown";
};

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

const generateVoucherNumber = (index) => {
  return `V-${index + 1}`;
};

const generateInvoiceId = (index) => {
  return `${index + 1}`;
};

const HotelVoucher = () => {
  const location = useLocation();
  // const history = useHistory();
  const navigate = useNavigate();
  const { voucher, accomodationsData, data } = location.state || {};
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [guest, setGuest] = useState("");
  const headName =
    data?.passengers[0]?.name || voucher?.customer?.contactPerson;

  console.log("acc data", accomodationsData);
  console.log("voucher data", voucher);

  useEffect(() => {
    const count = mutamerData?.length;
    setTotalPassengers(count);
  }, [voucher]);

  useEffect(() => {
    const guestname = mutamerData[0]?.name;
    setGuest(guestname);
  }, [voucher]);

  if (!voucher) {
    return <div>No voucher data found</div>;
  }

  const passengers = data?.passengers ? data.passengers : voucher.passengers;
  // Extract passengers data
  const passengersData =
    passengers?.map((passenger, index) => ({
      sno: 1, // Start from 2 since customer is at sno 1
      passport: passenger.passportNumber,
      name: passenger.name,
      gender: passenger.gender,
      pax: getPaxType(passenger.age),
      bed: "Yes",
      mofa: passenger.mofa,
      visa: passenger.visa,
      pnr: passenger.pnr,
    })) || [];

  // Combine customer and passengers into mutamerData array
  const mutamerData = [...passengersData];

  const accomodationData = accomodationsData?.map((accommodation) => {
    const formatDate = (date) => new Date(date).toISOString().split("T")[0];
    const checkinDate = new Date(accommodation.checkin);
    const checkoutDate = new Date(accommodation.checkout);
    const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
    const nightDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return {
      city: accommodation.hotelCity,
      hotel: accommodation.hotelName,
      view: accommodation.view,
      meal: accommodation.meal,
      conf: accommodation.conf,
      roomType: accommodation.roomType,
      checkin: formatDate(accommodation.checkin),
      checkout: formatDate(accommodation.checkout),
      nights: nightDifference,
      rate: accommodation.bedRate,
      roomQuantity: accommodation.noOfBeds,
    };
  });

  const handleShowInvoice = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const invoiceId = generateInvoiceId(0);
    navigate(`/admin/hotel-invoice/${invoiceId}`, {
      state: {
        data: data,
        voucher: voucher,
        accomodationsData: accomodationsData,
        count: totalPassengers,
        printDate: currentDate,
        guest: guest,
      },
    });
  };

  return (
    <div className="w-full flex flex-col pb-5">
      <TopBar title="Hotel Voucher" />
      <button
        className="ml-auto mr-8 mt-4 bg-orange text-white font-bold py-2 px-4 rounded"
        onClick={handleShowInvoice}
      >
        Show Invoice
      </button>

      <div className="p-1 sm:p-4 py-6">
        <HotelVoucherTop
          headName={`${headName === "undefined" ? "No Head" : headName}`}
          voucher={voucher.voucherNumber}
        />

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
