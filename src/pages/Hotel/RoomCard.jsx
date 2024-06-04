import React from "react";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-black border border-white p-3 text-orange rounded-lg w-auto sm:w-80 font-Nunitoo">
      {/* Room Number */}
      
      <h3 className="text-lg font-semibold mb-6 text-center">Room Number: {room.roomNumber}</h3>
      
      {/* Beds */}
      <div>
        {room.beds?.map((bed, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <p>Bed Number: {bed.bedNumber}</p>
            {!bed.isBooked ?
            <button className="bg-orange text-white px-3 py-1 rounded-md hover:border-white">Book Now</button>
            :
            <p className="text-white font-bold">Booked !</p>
              }
          </div>
         
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
