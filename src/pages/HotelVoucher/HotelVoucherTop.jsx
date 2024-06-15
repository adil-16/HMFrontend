import React from "react";

const HotelVoucherTop = ({headName, voucher}) => {
  return (
    <div className="w-full flex flex-row items-center gap-x-10 flex-wrap my-5">
      <div className="flex flex-row items-center">
        <p className="font-bold text-darkGray text-16 sm:text-19">
          Family Head:
        </p>
        <p className="font-medium text-white text-14 sm:text-16">
          {headName}
        </p>
      </div>
      <div className="flex flex-row items-center">
        <p className="font-bold text-darkGray text-16 sm:text-19">
          Hotel Voucher:
        </p>
        <p className="font-medium text-white text-14 sm:text-16">{voucher}</p>
      </div>
    </div>
  );
};

export default HotelVoucherTop;
