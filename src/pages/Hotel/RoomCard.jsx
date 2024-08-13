import React, { useState } from "react";

const RoomCard = ({ room, hotel, setRooms }) => {
  const convertDate = (stringDate) => {
    return new Date(stringDate).toISOString().split("T")[0];
  };

  const [show, setShow] = new useState("Booked");

  const toggle = ()=>{
    if(show == "Booked"){
      setShow("Available");
    }
    else{
      setShow("Booked");
    }
  }

  return (
    <div className="bg-black border border-white p-3 text-orange rounded-lg w-auto sm:w-80 font-Nunitoo">
      <h3 className="text-lg font-semibold mb-1 text-center">
        Room Number: {room.roomNumber}
        <span className="text-white"> | {room.roomType}</span>
      </h3>
      <div className = "flex justify-center mb-6 ">
        <p>{`(${convertDate(room.checkinDate)} to ${convertDate(room.checkoutDate)})`}</p>
      </div>
      <div className="border rounded-lg">
        {
        (show == "Booked")?
        <div className="flex">
        
          <button className="flex-1 py-2 rounded-b-none rounded-tr-none text-center font-bold bg-orange text-white">
            Booked
          </button>
          <button onClick={toggle} className="flex-1 py-2 rounded-b-none rounded-tl-none  text-center font-bold  bg-orange-800">
            Available
          </button>
        </div>:
        <div className="flex">
        
          <button onClick={toggle} className="flex-1 py-2 rounded-b-none rounded-tr-none text-center font-bold bg-orange-800">
            Booked
          </button>
          <button className="flex-1 py-2 rounded-b-none rounded-tl-none  text-center font-bold  bg-orange text-white">
            Available
          </button>
        </div>
        }
        {
        (show == "Booked")?
        <div className="p-3">
          {room.customersData?.map((customerData, index) => (
            <div key={index} className="mb-2">
              <p>{`${customerData.noOfBeds} Beds - (${convertDate(customerData.checkinDate)} to ${convertDate(customerData.checkoutDate)})`}</p>
            </div>
          ))}
        </div>:
        <div className="p-3">
        {room.availability?.map((customerData, index) => (
          <div key={index} className="mb-2">
            <p>{`${customerData.noOfBeds} Beds - (${convertDate(customerData.checkinDate)} to ${convertDate(customerData.checkoutDate)})`}</p>
          </div>
        ))}
      </div>
        }
        
      </div>
    </div>
  );
};

export default RoomCard;