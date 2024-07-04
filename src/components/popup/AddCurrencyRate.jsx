import React, { useState } from "react";
import Cross from "../../assets/cross.svg";
import axios from "../../axios";

const AddCurrencyRate = ({ onClose }) => {
  const [rate, setRate] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/ledger/updateCurrencyRate",
        { rate },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Currency rate updated successfully");
      } else {
        console.error("Failed to update currency rate");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-black border border-white p-6 rounded-xl shadow-md relative">
        <div className="absolute top-0 right-0 m-2 cursor-pointer bg-orange rounded-full">
          <img
            src={Cross}
            alt="cross-icon"
            onClick={onClose}
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
        </div>
        <div className="text-center mt-2 mb-4">
          <h2 className="font-Nunitoo text-orange text-19 sm:text-24 font-medium">
            Add Currency Rate
          </h2>
        </div>
        <div className="h-full overflow-y-auto">
          <div className="mb-10">
            <label className="font-Nunitoo font-medium text-orange text-14 py-2">
              Enter Rate for SAR
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Amount"
              className=" remove-arrow w-full px-2 py-2 bg-white text-black border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              className="bg-orange text-white px-6 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCurrencyRate;
