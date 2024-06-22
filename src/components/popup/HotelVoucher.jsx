import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";
import HotelVoucherForm from "../../components/forms/HotelVoucherDetails";

const CashVoucherPopup = ({ onClose }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [rooms, setRooms] = useState([{ hotel: "", roomType: "", checkin: "", checkout: "", bedRate: "" }]);
  const [voucherData, setVoucherData] = useState(null);
  const [hotels, setHotels] = useState([]);

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
    // Fetch hotels when the component mounts
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

  const handleSubmit = async () => {
    const data = {
        customer: selectedCustomer,
        accommodations: rooms.map(room => ({
          ...room,
          hotelName: hotels.find(hotel => hotel.id === room.hotel)?.name || "",
          hotelCity: hotels.find(hotel => hotel.id === room.hotel)?.location || ""

        })),
      };
    
    console.log("voucher data", data);
    try {
      const response = await axios.post("/hotel-voucher/vouchers", data);
      const newVoucherData = response.data.data;
      console.log("Voucher submitted:", newVoucherData);
      setVoucherData(newVoucherData); // Save the voucher data to state
      navigate(`/admin/hotel-voucher/${newVoucherData.voucher._id}`, { state: { voucher: newVoucherData, accomodationsData: data.accommodations } });
    } catch (error) {
      console.error("Error submitting voucher:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-black border border-white p-4 rounded-xl shadow-md px-6 md:px-8">
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
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
            <option value="">Select Customer</option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Add Details
          </label>
          <HotelVoucherForm rooms={rooms} setRooms={setRooms} />
        </div>

        <div className="flex justify-center my-2 sm:mt-8 sm:mb-10">
          <SubmitButton text="Create" submit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CashVoucherPopup;