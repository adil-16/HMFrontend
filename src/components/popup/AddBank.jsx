import React, { useEffect, useState } from "react";
import Cross from "../../assets/cross.svg";
import AddBankForm from "../forms/AddBankForm";

const AddBank = ({ onClose, heading, setAdded, updateData }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="m-8">
        <div className="flex flex-wrap justify-end h-2">
          <div className="m-4 sm:m-8 cursor-pointer bg-orange rounded-full">
            <img
              src={Cross}
              alt="cross-icon"
              onClick={onClose}
              className="w-5 h-5 sm:w-8 sm:h-8"
            />
          </div>
        </div>

        <div className="bg-black border border-white p-2 rounded-xl shadow-md px-3 md:px-8">
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-Nunitoo text-orange text-19 sm:text-24 font-medium pt-2 sm:pt-8 pb-2">
              {heading}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row">
            <AddBankForm
              onClose={onClose}
              setAdded={setAdded}
              updateData={updateData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBank;
