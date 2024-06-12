import React, { useState } from "react";

const PackageCard = ({ data, setBook, setPackageId }) => {
  const { packageId, packageName, hotels } = data;
  const [url] = useState(import.meta.env.VITE_API_URL);

  return (
    <div className="bg-black border border-white p-3 text-orange rounded-lg w-auto sm:w-80 font-Nunitoo">
      {/* Package Information */}
      <div className="mb-4">
        <p className="font-Nunitoo text-16 lg:text-24 font-bold text-white">
          {packageName}
        </p>
        <p className="font-Nunitoo text-16 lg:text-20 font-bold text-white mt-2">
          Package ID: <span className="text-orange">{packageId}</span> 
        </p>
      </div>

      {/* Hotel Information */}
      {hotels?.map((hotel, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-start">
            <div className="flex items-center m-3">
              <p className="font-Nunitoo text-16 lg:text-20 font-bold text-orange">
                {index + 1}. {hotel.hotel.name} 
              </p>
            </div>
          </div>

          <p className="font-Nunitoo text-14 lg:text-19 font-bold text-white">
            Room Rate: <span className="text-orange">{hotel.roomRate}</span> 
          </p>
        </div>
      ))}

    </div>
  );
};

export default PackageCard;
