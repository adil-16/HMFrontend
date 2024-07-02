import React, { useEffect, useState } from "react";
import axios from "../../axios";

const HotelVoucherForm = ({ rooms, setRooms }) => {
  const roomTypes = ["Shared", "Quatre", "Triple", "Double"];
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch hotels when the component mounts
    const fetchHotels = async () => {
      try {
        const response = await axios.get("/hotel/getHotels");
        setHotels(response.data.data.hotels);
        console.log("hotels", response.data.data.hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleRoomChange = (index, event) => {
    const { name, value } = event.target;
    const newRooms = [...rooms];
    newRooms[index][name] = value;
    setRooms(newRooms);
  };

  const addRoom = () => {
    setRooms([
      ...rooms,
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
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const newRooms = [...rooms];
      newRooms.splice(index, 1);
      setRooms(newRooms);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(rooms);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {rooms?.map((room, roomIndex) => (
          <div key={roomIndex} className="mb-4">
            <div className="mt-3">
              <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                Hotel
              </label>
              <select
                value={room.hotel}
                name="hotel"
                onChange={(e) => handleRoomChange(roomIndex, e)}
                className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="">Select Hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-x-1 mt-2">
              <select
                className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14"
                name="roomType"
                value={room.roomType}
                onChange={(e) => handleRoomChange(roomIndex, e)}
              >
                <option value=""> Room Type</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className={`border border-blue3 bg-black text-white focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                placeholder="Check-in Date"
                name="checkin"
                value={room.checkin}
                onChange={(e) => handleRoomChange(roomIndex, e)}
              />
              <input
                type="date"
                className={`border border-blue3 bg-black text-white focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                placeholder="Check-out Date"
                name="checkout"
                value={room.checkout}
                onChange={(e) => handleRoomChange(roomIndex, e)}
              />
            </div>

            <div className="flex gap-x-1 mt-2">
              <>
                <input
                  type="number"
                  className={`border border-blue3 bg-black text-white focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                  placeholder="Room Rate"
                  name="roomRate"
                  value={room.roomRate}
                  onChange={(e) => handleRoomChange(roomIndex, e)}
                />
                <input
                  type="number"
                  className={`border border-blue3 bg-black text-white focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                  placeholder="Total Rooms"
                  name="totalRooms"
                  value={room.totalRooms}
                  onChange={(e) => handleRoomChange(roomIndex, e)}
                />
              </>
              <div
                onClick={() => removeRoom(roomIndex)}
                className="flex items-center justify-center h-6 w-6 rounded-full text-white cursor-pointer bg-red-500"
              >
                -
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addRoom}
          className="mt-3 bg-orange text-white py-2 px-4 rounded"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default HotelVoucherForm;
