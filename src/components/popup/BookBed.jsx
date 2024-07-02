import React, { useState, useEffect } from "react";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";

const BookBedPopup = ({ onClose, roomNumber, bed, hotelId, roomId, onBedBooked }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("/user/getCustomers");
      setUsers(response.data.data.customers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      roomId: roomId, 
      bedId: bed,
      customer: selectedUser,
      Booking: {
        from: fromDate,
        to: toDate,
      },
    };

    try {
      const response = await axios.put(`/hotel/bookBed/${hotelId}`, data);
      console.log("Bed booked:", response.data);
      onBedBooked(bed);
      onClose();
    } catch (error) {
      console.error("Error booking bed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-black border border-white p-4 rounded-xl shadow-md px-6 md:px-8">
        <div
          className="absolute top-2 right-2 cursor-pointer bg-orange rounded-full"
          onClick={onClose}
        >
          <img src={Cross} alt="cross-icon" className="w-5 h-5 sm:w-8 sm:h-8" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-Nunitoo text-orange text-19 sm:text-24 font-medium pt-2 pb-2">
            Book Bed
          </h2>
        </div>

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
            Select Customer
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
            <option value="">Select Customer</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.contactPerson}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        <div className="flex justify-center my-4">
          <SubmitButton text="Book" submit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default BookBedPopup;
