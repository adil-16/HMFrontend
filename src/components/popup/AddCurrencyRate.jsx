import React, { useState } from "react";
import Cross from "../../assets/cross.svg";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import CircularLoader from "../../components/CircularLoader";

const schema = yup.object().shape({
  rate: yup
    .number()
    .required("Rate is required")
    .typeError("Rate must be a number")
    .positive("Rate must be a positive number"),
});

const AddCurrencyRate = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/ledger/updateCurrencyRate", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Currency rate updated successfully");
        console.log("Currency rate updated successfully");
        onClose();
        reset(); // Reset form after successful submission
      } else {
        toast.error("Failed to update currency rate");
        console.error("Failed to update currency rate");
      }
    } catch (error) {
      toast.error("Failed to update currency rate. Please try again.");
      console.error("Error:", error);
    }
    setLoading(false);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10">
              <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                Enter Rate for SAR
              </label>
              <input
                type="number"
                {...register("rate")}
                placeholder="Amount"
                className={`remove-arrow w-full px-2 py-2 bg-white text-black border border-gray-300 rounded-md ${
                  errors.rate ? "border-red-500" : ""
                }`}
              />
              {errors.rate && (
                <span className="text-red-500">{errors.rate.message}</span>
              )}
            </div>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-orange flex justify-center items-center h-10 focus:outline-none w-auto md:w-40 m-2"
                disabled={loading}
              >
                {loading ? (
                  <CircularLoader size={6} color="white" />
                ) : (
                  <p className="font-Nunitoo font-medium text-14 text-white">
                    Submit
                  </p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCurrencyRate;
