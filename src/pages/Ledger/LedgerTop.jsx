import React from "react";

const LedgerTop = ({
  accountCode,
  accountTitle,
  balance,
  periodFrom,
  periodTo,
  printDate,
  currency,
}) => {
  return (
    <div className="font-Nunito w-full flex flex-col sm:flex-row justify-between my-5 flex-wrap overflow-x-auto">
      {/* first col */}
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">Account Code:</p>
          <p className="font-medium text-white text-14 sm:text-16">{accountCode}</p>
        </div>
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">Account Title:</p>
          <p className="font-medium text-white text-14 sm:text-16">{accountTitle}</p>
        </div>
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">Balance:</p>
          <p className="font-medium text-white text-14 sm:text-16">{balance}</p>
        </div>
      </div>

      {/* second Col */}
      <div className="flex flex-col md:items-end items-start">
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">Period:</p>
          <p className="font-medium text-white text-14 sm:text-16">{periodFrom}</p>
          <p className="font-bold text-darkGray text-16 sm:text-19">To:</p>
          <p className="font-medium text-white text-14 sm:text-16">{periodTo}</p>
        </div>
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">Print Date:</p>
          <p className="font-medium text-white text-14 sm:text-16">{printDate}</p>
        </div>
        <div className="flex flex-row items-center gap-x-4 mb-2">
          <p className="font-bold text-darkGray text-16 sm:text-19">Currency:</p>
          <p className="font-medium text-white text-14 sm:text-16">{currency}</p>
        </div>
      </div>
    </div>
  );
};

export default LedgerTop;
