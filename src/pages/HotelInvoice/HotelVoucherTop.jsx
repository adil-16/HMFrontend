import React from "react";

const HotelVoucherTop = ({ headName, voucher, count, guest }) => {
  return (
    <div className="flex flex-row  xm:items-center xm:justify-between bg-black width-full shadow-md border-b border-b-white">
      <div className="w-full flex flex-row flex-wrap my-5">
        <div className="w-1/2 flex flex-col gap-y-3">
          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              Customer Name:
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">
              {voucher?.customer?.customerType === "guest"
                ? "Table Client"
                : voucher?.customer?.companyName}
            </p>
          </div>

          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              Attention:
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">
              {headName}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              Email Address:
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">
              {voucher.customer.email}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              Guest Name:
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">
              {guest}
            </p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-y-3">
          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              Hotel Con. No. :
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">
              {/* Add Hotel Con. No. here */}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              Total PAX :
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">{count}</p>
          </div>
          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              VAT Number :
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">
              {voucher?.voucher?.vatnumber}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <p className="font-bold text-darkGray text-12 sm:text-16">
              Mobile Number :
            </p>
            <p className="font-medium ml-2 text-white text-14 sm:text-16">
              {voucher.customer.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelVoucherTop;
