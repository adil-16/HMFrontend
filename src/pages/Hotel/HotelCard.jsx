import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../assets/Avatar.svg";
import axios from "../../axios";

const HotelCard = ({ data }) => {
  const {
    id,
    name,
    location,
    bookedBeds,
    availableBeds,
    totalRooms,
    totalBeds,
    rooms,
  } = data;
  const [url] = useState(import.meta.env.VITE_API_URL);
  const [availableRooms, setAvailableRooms] = useState();
  const [bookedRooms, setBookedRooms] = useState();

  // if (!hotel) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Link
      to={`/admin/hotel/${id}`}
      className="bg-black border border-white p-3 text-orange rounded-lg w-auto sm:w-80 font-Nunitoo"
    >
      {/* Hotel Image */}
      <div className="flex items-center justify-around">
        <div className="h-20 w-20">
          {data?.image == null ? (
            <img
              src={Avatar}
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
          ) : (
            <img
              src={`${url}${data?.image}`}
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
          )}
        </div>

        {/* Hotel Name and Location */}
        <div className="flex flex-col items-center m-3">
          <p className="font-Nunitoo text-16 lg:text-24 font-bold text-white">
            {name}
          </p>
          <p className="font-Nunitoo text-12 lg:text-16 font-regular text-orange">
            {location}
          </p>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="p-3">
        <p className="font-Nunitoo text-12 lg:text-16 font-bold text-orange">
          Total Rooms: <span className="font-regular">{totalRooms}</span>
        </p>
        <p className="font-Nunitoo text-12 lg:text-16 font-bold text-orange">
          Total Beds: <span className="font-regular">{totalBeds}</span>
        </p>

        {/* Room Details */}
        {/* <div className="px-4 py-1">
          {rooms?.map((room, index) => (
            <p
              key={index}
              className="font-Nunitoo text-12 lg:text-16 font-bold text-orange"
            >
              {room.type}: <span className="font-regular">{room.number}</span>
            </p>
          ))}
        </div> */}
      </div>

      {/* Button for Booking */}
      <div className="flex justify-center mt-3">
        <button className="font-Nunitoo bg-orange text-white py-2 px-4 rounded-lg">
          Book Rooms/Beds
        </button>
      </div>
    </Link>
  );
};

export default HotelCard;
