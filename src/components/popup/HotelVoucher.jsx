import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";
import HotelVoucherForm from "../../components/forms/HotelVoucherDetails";
import PassengerForm from "../forms/PassenegersForm";
import { InputDefault } from "../inputFields/inputFiels";

const CashVoucherPopup = ({ onClose }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [rooms, setRooms] = useState([
    {
      hotel: "",
      roomType: "",
      checkin: "",
      checkout: "",
      bedRate: "",
      roomRate: "",
      totalRooms: "",
    },
  ]);
  const [voucherData, setVoucherData] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [banks, setBanks] = useState([]);
  const [voucherDetails, setVoucherDetails] = useState({
    confirmationStatus: "",
    tentativeHours: 24,
    vatnumber: "",
    passengers: [],
    paymentMethod: "cash",
    bankId: "",
  });

  const navigate = useNavigate();
  const getCustomers = async () => {
    try {
      const response = await axios.get("/user/getCustomers");
      setCustomers(response.data.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("/hotel/getHotels");
        setHotels(response.data.data.hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("/bank/getBanks");
        setBanks(response.data);
        console.log("banks", response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const handleVoucherDetailsChange = (event) => {
    const { name, value } = event.target;
    setVoucherDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "tentativeHours" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let latestVoucherNumber =
        localStorage.getItem("latestVoucherNumber") || 0;
      latestVoucherNumber = parseInt(latestVoucherNumber, 10) + 1;

      const data = {
        voucherNumber: latestVoucherNumber,
        customer: selectedCustomer,
        confirmationStatus: voucherDetails.confirmationStatus,
        tentativeHours: voucherDetails.tentativeHours || 0,
        vatnumber: voucherDetails.vatnumber || null,
        accommodations: rooms.map((room) => ({
          ...room,
          hotelName:
            hotels.find((hotel) => hotel.id === room.hotel)?.name || "",
          hotelCity:
            hotels.find((hotel) => hotel.id === room.hotel)?.location || "",
        })),
        passengers: voucherDetails.passengers || [],
        paymentMethod: voucherDetails.paymentMethod,
        bankId: voucherDetails.bankId,
      };

      console.log("Data", data);
      const response = await axios.post("/hotel-voucher/vouchers", data);
      const newVoucherData = response.data.data;

      setVoucherData(newVoucherData);
      localStorage.setItem("latestVoucherNumber", latestVoucherNumber);

      navigate(`/admin/hotel-voucher/${newVoucherData.voucher._id}`, {
        state: {
          data: data,
          voucher: {
            ...newVoucherData,
            voucherNumber: `V-${newVoucherData.voucher.voucherNumber}`,
          },
          accomodationsData: data.accommodations,
        },
      });
    } catch (error) {
      console.error("Error submitting voucher:", error);
    }
  };

  const handleCustomerChange = (event) => {
    const customerId = event.target.value;
    setSelectedCustomer(customerId);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-black border border-white p-4 rounded-xl shadow-md px-6 md:px-8"
        style={{ maxHeight: "700px", overflowY: "scroll" }}
      >
        <div
          className="absolute top-2 right-2 cursor-pointer bg-orange rounded-full"
          onClick={onClose}
        >
          <img
            src={Cross}
            alt={"cross-icon"}
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-Nunitoo text-orange text-19 sm:text-24 font-medium pt-2 pb-2">
            Create Voucher
          </h2>
        </div>

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
            Customer
          </label>
          <select
            value={selectedCustomer}
            onChange={handleCustomerChange}
            className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
            <option value="">Select Customer</option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.contactPerson}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
            Confirmation Status
          </label>
          <select
            name="confirmationStatus"
            value={voucherDetails.confirmationStatus}
            onChange={handleVoucherDetailsChange}
            className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
            <option value="">Select Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Tentative">Tentative</option>
          </select>
        </div>

        {voucherDetails.confirmationStatus === "Tentative" && (
          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Tentative Hours
            </label>
            <select
              name="tentativeHours"
              value={voucherDetails.tentativeHours}
              onChange={handleVoucherDetailsChange}
              className="bg-black border border-gray text-white ml-2 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            >
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={72}>72</option>
              <option value={96}>96</option>
              <option value={120}>120</option>
            </select>
          </div>
        )}

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
            VAT Number
          </label>
          <input
            type="text"
            name="vatnumber"
            value={voucherDetails.vatnumber}
            onChange={handleVoucherDetailsChange}
            className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        <div className="mt-3">
          <div className="block font-Nunitoo font-medium text-orange text-14 py-2">
            Payment Method
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={voucherDetails.paymentMethod === "cash"}
              onChange={handleVoucherDetailsChange}
              className="mr-2"
            />
            <label htmlFor="cash" className="mr-6 text-white">
              Cash
            </label>
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              value="bank"
              checked={voucherDetails.paymentMethod === "bank"}
              onChange={handleVoucherDetailsChange}
              className="mr-2"
            />
            <label htmlFor="bank" className="text-white">
              Bank
            </label>
          </div>
        </div>

        {voucherDetails.paymentMethod === "bank" && (
          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Select Bank
            </label>
            <select
              name="bankId"
              value={voucherDetails.bankId}
              onChange={handleVoucherDetailsChange}
              className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            >
              <option value="">Select Bank</option>
              {banks.map((bank) => (
                <option key={bank._id} value={bank._id}>
                  {bank.bankName}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedCustomer && (
          <>
            <PassengerForm
              passengers={voucherDetails.passengers}
              setPassengers={(newPassengers) =>
                setVoucherDetails({
                  ...voucherDetails,
                  passengers: newPassengers,
                })
              }
            />
          </>
        )}

        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Add Details
          </label>
          <HotelVoucherForm rooms={rooms} setRooms={setRooms} />
        </div>

        <div className="flex justify-center mt-6">
          <SubmitButton submit={handleSubmit} text="Submit" />
        </div>
      </div>
    </div>
  );
};

export default CashVoucherPopup;
