import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "../../axios";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  reportType: yup.string().required("Report type is required"),
  duration: yup.string().required("Duration is required"),
  fromDate: yup.string().when("duration", (duration, schema) => {
    duration === "Custom" ? schema.required("From date is required") : schema;
  }),
  toDate: yup.string().when("duration", (duration, schema) => {
    duration === "Custom" ? schema.required("To date is required") : schema;
  }),
  hotelId: yup.string().required("Hotel selection is required"),
  confirmationStatus: yup.string().required("Voucher status is required"),
});

const Arrival_Dep_Reports = ({ onSubmit, setTitle }) => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getHotels = async () => {
    await axios
      .get("/hotel/getHotels")
      .then((res) => {
        console.log("data is hotels ", res.data);
        setHotels(res.data.data.hotels);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHotels();
    setTitle(watch("reportType"));
  }, [watch("reportType")]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    console.log("form data", data);
    try {
      const res = await axios.get("/hotel-voucher/filtered-vouchers", {
        params: data,
      });
      const { vouchers, paxCounts } = res.data.data;
      onSubmit(vouchers);
      setVouchers(vouchers);
      setLoading(false);
      navigate("/admin/report", {
        state: { title: data.reportType, paxCounts, vouchers },
      });
      toast.success("Report generated successfully!");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to fetch vouchers matching the criteria");
    }
  };

  const handleHotelChange = (option) => {
    setSelectedHotel(option);
    setValue("hotelId", option.value);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-4 bg-black rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">
          Report Type
        </label>
        <select
          {...register("reportType")}
          className="w-full bg-white text-black p-2 rounded-md"
        >
          <option value="Arrival Intimation">Arrival Intimation</option>
          <option value="Departure Intimation">Departure Intimation</option>
        </select>
        {errors.reportType && (
          <span className="text-red-500">{errors.reportType.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Duration</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              {...register("duration")}
              value="Today"
              className="form-radio"
            />
            <span className="ml-2">Today</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              {...register("duration")}
              value="Tomorrow"
              className="form-radio"
            />
            <span className="ml-2">Tomorrow</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register("duration")}
              value="Custom"
              className="form-radio"
            />
            <span className="ml-2">Custom</span>
          </label>
        </div>
        {errors.duration && (
          <span className="text-white font-semibold">
            {errors.duration.message}
          </span>
        )}
      </div>
      {watch("duration") === "Custom" && (
        <>
          <div className="mb-4">
            <label className="block text-orange font-medium mb-2">
              From Date
            </label>
            <input
              type="date"
              {...register("fromDate")}
              className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
            />
            {errors.fromDate && (
              <span className="text-white font-semibold">
                {errors.fromDate.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-orange font-medium mb-2">
              To Date
            </label>
            <input
              type="date"
              {...register("toDate")}
              className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
            />
            {errors.toDate && (
              <span className="text-white font-semibold">
                {errors.toDate.message}
              </span>
            )}
          </div>
        </>
      )}
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Hotel</label>
        <Controller
          name="hotelId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={hotels.map((hotel) => ({
                value: hotel.id,
                label: hotel.name,
              }))}
              value={selectedHotel}
              onChange={handleHotelChange}
              placeholder="Select a hotel"
              className="w-full bg-white text-black"
            />
          )}
        />
        {errors.hotelId && (
          <span className="text-white font-semibold">
            {errors.hotelId.message}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">
          Voucher Status
        </label>
        <select
          {...register("confirmationStatus")}
          className="w-full bg-white text-black p-2 rounded-md"
        >
          <option value="Confirmed">Confirmed</option>
          <option value="Tentative">Tentative</option>
          <option value="Both">Both</option>
        </select>
        {errors.confirmationStatus && (
          <span className="text-red-500">
            {errors.confirmationStatus.message}
          </span>
        )}
      </div>
      <div className="flex justify-start mt-12">
        <SubmitButton
          text="Generate Report"
          submit={handleSubmit(handleFormSubmit)}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default Arrival_Dep_Reports;
