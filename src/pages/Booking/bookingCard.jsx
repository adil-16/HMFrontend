import React, { useState } from "react";
import Avatar from "../../assets/Avatar.svg";
import CustomerCard from "./CustomerCard";

const BookingCard = ({ data }) => {
  console.log("card is", data);

  const [url] = useState(import.meta.env.VITE_API_URL);
  return (
    <div className="p-4 w-full">
      <div className="flex flex-wrap items-center gap-x-4">
        <div className="w-20 h-20">
          {data.image == null ? (
            <img
              src={Avatar}
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
          ) : (
            <img
              src={`${url}${data.image}`}
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
          )}
        </div>
        <div>
          <p className="font-Nunitoo text-24 lg:text-32 font-bold text-white">
            {data.name}
          </p>
          <p className="font-Nunitoo text-12 lg:text-16 font-bold text-orange">
            {data.location}
          </p>
        </div>
      </div>

      {/* div 1 */}

      <div className="flex gap-x-3 my-3 ">
        {data?.rooms?.map((val, ind) => {
            return <CustomerCard key={ind} data={val} />
        })}
      </div>
    </div>
  );
};

export default BookingCard;
