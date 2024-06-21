import React, { useState } from "react";
import BookBedPopup from "../../components/popup/BookBed"; 

const RoomCard = ({ room, hotel, setRooms }) => { 
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null); 

  const handleBookNow = (bed) => {
    setSelectedBed(bed); 
    setShowPopup(true);
  // console.log("selected bed", selectedBed)

  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  // console.log("selected bed ID", selectedBed?._id)

  const onBedBooked = (bedId) => {
    // Update the local state to mark the bed as booked
    const updatedRoom = {
      ...room,
      beds: room.beds.map((bed) =>
        bed._id === bedId ? { ...bed, isBooked: true } : bed
      ),
    };
    
    // Update the parent state with the modified rooms array
    setRooms((prevRooms) =>
      prevRooms.map((r) => (r._id === room._id ? updatedRoom : r))
    );
  };

  return (
    <div className="bg-black border border-white p-3 text-orange rounded-lg w-auto sm:w-80 font-Nunitoo">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Room Number: {room.roomNumber}
        <span className="text-white">| ({room.roomType})</span>
      </h3>
      
      {room.beds?.map((bed, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <p>
            Bed No: <span className="text-white">{bed.bedNumber} |</span>{" "}
            Rate: <span className="text-white">({bed.bedRate})</span>
          </p>
          {!bed.isBooked ? (
            <button
              onClick={() => handleBookNow(bed)} 
              className="bg-orange text-white px-3 py-1 rounded-md hover:border-white"
            >
              Book Now
            </button>
          ) : (
            <p className="text-white font-bold">Booked !</p>
          )}
        </div>
      ))}

      {showPopup && selectedBed && (
        <BookBedPopup
          onClose={handleClosePopup}
          roomNumber={room.roomNumber}
          roomId ={room._id}
          bed={selectedBed?._id}
          hotelId={hotel} 
          onBedBooked={onBedBooked}
        />
      )}
    </div>
  );
};

export default RoomCard;
