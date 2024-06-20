import React, { useState } from "react";
import Cross from "../../assets/cross.svg";
import { useNavigate } from "react-router-dom";

const ShowLedgerPopup = ({ onClose, onSubmit }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    onSubmit(fromDate, toDate);
    onClose();
    navigate("/admin/ledger"); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <img
          src={Cross}
          alt="cross-icon"
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 cursor-pointer bg-orange rounded-full"
        />
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-orange">Select Dates</h2>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-orange mb-2">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-orange mb-2">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-white"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-orange text-white py-2 px-4 rounded-md w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ShowLedgerPopup;
