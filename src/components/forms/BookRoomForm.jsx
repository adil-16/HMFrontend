import React, { useState, useEffect, useRef } from "react";
import { CheckboxLabell } from "../checkbox/CheckBoxGray";
import DropdownMenu from "./DropDown";
import SubmitButton from "../../components/buttons/SubmitButton";
import axios from "../../axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookRoomForm = ({
  onClose,
  data,
  users,
  id,
  addHotel,
  setShowAddUser,
}) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null); // Initialize with null

  const handleCheckboxChange = (roomNumber) => {
    setSelectedRoom(roomNumber);
  };

  const bookRoom = async () => {
    await axios
      .put("/hotel/bookRoom/" + id, {
        roomNumber: selectedRoom,
        Booking: { from, to },
        customer: selectedUser.id,
      })
      .then((res) => {
        addHotel((prev) => !prev);
      })
      .catch((err) => {
        // //   setCategoryapi(true)
        // setLoader(false)
        //   setError(err.response.data.data.error);
      });
  };

  return (
    <div className="mx-4 ">
      <label className="font-Nunitoo font-medium text-orange text-14 py-2">
        Select User
      </label>
      <div className="flex items-center gap-x-6 mt-3">
        <DropdownMenu
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <button
          className="bg-orange text-white"
          onClick={() => {
            setShowAddUser(true);
          }}
        >
          Add User
        </button>
      </div>

      {/* duration */}
      <div className="mt-2">
        {/* from */}
        <div>
          <p className="font-Nunitoo font-medium text-orange text-14 py-2">
            From
          </p>
          <DatePicker
            selected={from}
            onChange={(date) => setFrom(date)}
            className="position-relative border border-black border-opacity-10 focus:outline-none rounded-md p-2 w-80 mt-2"
            placeholderText="Select From Date"
            minDate={new Date()} // Set minimum date to today
            onFocus={(e) => e.target.blur()} // Blur the input field on focus to prevent keyboard input
          />
        </div>

        {/* to*/}
        <div>
          <p className="font-Nunitoo font-medium text-orange text-14 py-2">
            To
          </p>
          <DatePicker
            selected={to}
            onChange={(date) => setTo(date)}
            className="position-relative border border-black border-opacity-10 focus:outline-none rounded-md p-2 w-80 mt-2"
            placeholderText="Select To Date"
            minDate={new Date()} // Set minimum date to today
            onFocus={(e) => e.target.blur()} // Blur the input field on focus to prevent keyboard input
          />
        </div>
      </div>

      {/* room type */}
      <div className="mt-4">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Select Room
        </label>
        <div className="flex flex-wrap w-80 h-20 gap-x-4 overflow-y-auto">
          {data.map((val, ind) => (
            <div key={ind} className="flex items-center gap-x-2">
              <p className="font-Nunitoo font-medium text-white text-14 py-2">
                {val.roomType}: {val.roomNumber}
              </p>
              <CheckboxLabell
                isChecked={selectedRoom === val.roomNumber}
                handleCheckboxChange={() =>
                  handleCheckboxChange(val.roomNumber)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center my-2 " onClick={() => onClose()}>
        <SubmitButton text="Submit" submit={bookRoom} />
      </div>
    </div>
  );
};

export default BookRoomForm;
