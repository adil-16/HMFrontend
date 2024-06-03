import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import RoomCard from "./RoomCard";
import TopBar from "../../components/bars/TopBar";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`/hotel/getHotel/${id}`);
        setHotel(response.data.data.hotel);
        setRooms(response.data.data.hotel.rooms);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full font-Nunitoo">
      <TopBar title="Hotels" />
      <div className="w-full">
        {/* Display hotel details */}
        <h2 className="text-orange font-Nunitoo text-5xl lg:mt-8 lg:ml-5 ">
          {hotel.name}
        </h2>
        <p className="text-orange font-Nunitoo text-4xl lg:mt-8 lg:ml-8 ">
          {hotel.location}
        </p>
        <p className="text-white underline font-Nunitoo text-4xl text-center ">
          Rooms
        </p>
        <div className="flex flex-wrap justify-start gap-4 lg:mt-8 lg:ml-8">
          {rooms?.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
