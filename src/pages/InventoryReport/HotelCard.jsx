import React, { useState, useEffect } from "react";
import Avatar from "../../assets/Avatar.svg";

const HotelCard = ({ data, type }) => {
  const {
    hotelName,
    location,
    roomsInventory,
    bedsInventory
  } = data;

  const [url] = useState(import.meta.env.VITE_API_URL);
  // if (!hotel) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
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
            {hotelName}
          </p>
          <p className="font-Nunitoo text-12 lg:text-16 font-regular text-orange">
            {location}
          </p>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="p-3">
        {
          Object.keys(roomsInventory).map((key)=>{
            return (
              <div className = "flex justify-around">
                  {
                    type=="bed"?
                    <p className="font-Nunitoo text-12 lg:text-16 font-bold text-orange">
                    {key} Beds: <span className="font-regular">{bedsInventory[key]}</span>
                  </p>:
                  <p className="font-Nunitoo text-12 lg:text-16 font-bold text-orange">
                    {key} Rooms: <span className="font-regular">{roomsInventory[key]}</span>
                  </p>
                  }
                  
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default HotelCard;
