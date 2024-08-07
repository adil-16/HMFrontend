import React from "react";

const roundValue = (value) => {
  if (value === undefined || value === null) return "";

  const num = parseFloat(value);
  if (isNaN(num)) return "";

  const roundedValue = num % 1 === 0 ? num : Math.round(num);
  return roundedValue;
};

const LedgerTop = ({
  hotelName,
  roomNumber,
  printDate,
  roomType,
  roomData,
}) => {
  const roundedTotalCost = roundValue(roomData?.totalCost);
  const roundedTotalSale = roundValue(roomData?.totalSale);
  const roundedTotalProfit = roundValue(roomData?.totalProfit);
  return (
    <div className="font-Nunito w-full flex flex-col sm:flex-row justify-between my-5 flex-wrap overflow-x-auto">
      {/* first col */}
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">
            Hotel Name:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">
            {hotelName}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">
            Room Number:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">
            {roomNumber}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">
            Room Type:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">
            {roomType}
          </p>
        </div>
      </div>

      {/* second Col */}
      <div className="flex flex-col md:items-end items-start">
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">
            Print Date:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">
            {printDate}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-6 mt-8 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">
            Total Cost:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">
            {roundedTotalCost}
          </p>
          <p className="font-bold text-darkGray text-16 sm:text-19">
            Total Sale:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">
            {roundedTotalSale}
          </p>
          <p className="font-bold text-darkGray text-16 sm:text-19">
            Total Profit:
          </p>
          <p className="font-medium text-white text-14 sm:text-16">
            {roundedTotalProfit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LedgerTop;
