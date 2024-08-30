import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";
import HotelVoucherForm from "../../components/forms/HotelVoucherDetails";
import PassengerForm from "../forms/PassenegersForm";
import { InputDefault } from "../inputFields/inputFiels";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Loader from "../../components/CircularLoader";

const validationSchema = yup.object().shape({
  selectedCustomer: yup.string().required("Customer is required"),
  confirmationStatus: yup.string().required("Confirmation status is required"),
  tentativeHours: yup
    .number()
    .nullable()
    .when("confirmationStatus", (confirmationStatus, schema) =>
      confirmationStatus === "Tentative"
        ? schema
            .required("Tentative hours are required")
            .oneOf([24, 48, 72, 96, 120], "Invalid number of hours")
        : schema
    ),
  vatnumber: yup.string().required("VAT number is required"),
  paymentMethod: yup.string().required("Payment method is required"),
  bankId: yup.string().when("paymentMethod", {
    is: "bank",
    then: (schema) => schema.required("Bank is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const CashVoucherPopup = ({ onClose }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { passengers: [] },
  });
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
    getValues,
    setValue,
  } = methods;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([
    {
      bookingType: "sharing",
      bookingSubType: "family",
      autoAdjust:false,
      hotel: "",
      roomType: "",
      checkin: "",
      checkout: "",
      bedRate: "",
      noOfBeds: "",
      roomRate: "",
      totalRooms: "",
    },
  ]);
  const [hotels, setHotels] = useState([]);
  const [banks, setBanks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axios.get("/user/getCustomers");
        setCustomers(response.data.data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    getCustomers();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("/hotel/getHotels");
        setHotels(response.data.data.hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("/bank/getBanks");
        setBanks(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  const submit = async () => {
    setLoading(true);
    try {
      let latestVoucherNumber =
        localStorage.getItem("latestVoucherNumber") || 0;
      latestVoucherNumber = parseInt(latestVoucherNumber, 10) + 1;

      const values = getValues();
      if (values.passengers && values.passengers.length > 0) {
        const isValidPassengers = values.passengers.every(
          (passenger) =>
            passenger.name &&
            passenger.age &&
            passenger.gender &&
            passenger.nationality &&
            passenger.passportNumber
        );

        if (!isValidPassengers) {
          toast.error("Please fill out all passenger details.");
          setLoading(false);
          return;
        }
      }

      // console.log("rooms in hotel", rooms);

      // const isDefaultRoomValid = Object.values(rooms[0]).every(
      //   (value) => !!value
      // );
      // if (!isDefaultRoomValid) {
      //   toast.error("Please fill out all fields for the Hotel");
      //   setLoading(false);
      //   return;
      // }

      // // Validate all entries in rooms array
      // const areAllRoomsValid = rooms.every((room) =>
      //   Object.values(room).every((value) => !!value)
      // );

      // if (!areAllRoomsValid) {
      //   toast.error("Please fill out all fields for each hotel room");
      //   setLoading(false);
      //   return;
      // }

      const data = {
        voucherNumber: latestVoucherNumber,
        customer: values.selectedCustomer,
        confirmationStatus: values.confirmationStatus,
        tentativeHours: values.tentativeHours || 0,
        vatnumber: values.vatnumber || null,
        accommodations: rooms.map((room) => ({
          ...room,
          hotelName:
            hotels.find((hotel) => hotel.id === room.hotel)?.name || "",
          hotelCity:
            hotels.find((hotel) => hotel.id === room.hotel)?.location || "",
        })),
        passengers: values.passengers || [],
        paymentMethod: values.paymentMethod,
        bankId: values.bankId,
      };
      console.log("data", data);
      const response = await axios.post("/hotel-voucher/vouchers", data);
      const newVoucherData = response.data.data;

      localStorage.setItem("latestVoucherNumber", latestVoucherNumber);

      navigate(`/admin/hotel-voucher/${newVoucherData.voucher._id}`, {
        state: {
          data: data,
          voucher: {
            ...newVoucherData,
            voucherNumber: `V-${newVoucherData.voucher.voucherNumber}`,
          },
          accomodationsData: data.accommodations,
        },
      });
      toast.success("Voucher created successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.data.error
      ) {
        toast.error(error.response.data.data.error);
      } else {
        toast.error("Failed to create voucher.");
      }
      console.error("Error submitting voucher:", error);
    }
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div
          className="relative w-full max-w-lg bg-black border border-white p-4 rounded-xl shadow-md px-6 md:px-8"
          style={{ maxHeight: "700px", overflowY: "scroll" }}
        >
          <div
            className="absolute top-2 right-2 cursor-pointer bg-orange rounded-full"
            onClick={onClose}
          >
            <img
              src={Cross}
              alt={"cross-icon"}
              className="w-5 h-5 sm:w-8 sm:h-8"
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="font-Nunitoo text-orange text-19 sm:text-24 font-medium pt-2 pb-2">
              Create Voucher
            </h2>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className="mt-3">
              <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                Customer
              </label>
              <select
                name="selectedCustomer"
                {...register("selectedCustomer")}
                className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="">Select Customer</option>
                {customers?.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.contactPerson}
                  </option>
                ))}
              </select>
              {errors.selectedCustomer && (
                <p className="text-red-500">
                  {errors.selectedCustomer.message}
                </p>
              )}
            </div>

            <div className="mt-3">
              <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                Confirmation Status
              </label>
              <select
                name="confirmationStatus"
                {...register("confirmationStatus")}
                className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="">Select Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Tentative">Tentative</option>
              </select>
              {errors.confirmationStatus && (
                <p className="text-red-500">
                  {errors.confirmationStatus.message}
                </p>
              )}
            </div>

            {watch("confirmationStatus") === "Tentative" && (
              <div className="mt-3">
                <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                  Tentative Hours
                </label>
                <select
                  name="tentativeHours"
                  {...register("tentativeHours")}
                  className="bg-black border border-gray text-white ml-2 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                >
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                  <option value={72}>72</option>
                  <option value={96}>96</option>
                  <option value={120}>120</option>
                </select>
                {errors.tentativeHours && (
                  <p className="text-red-500">
                    {errors.tentativeHours.message}
                  </p>
                )}
              </div>
            )}

            <div className="mt-3">
              <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                VAT Number
              </label>
              <input
                type="text"
                name="vatnumber"
                {...register("vatnumber")}
                className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
              {errors.vatnumber && (
                <p className="text-red-500">{errors.vatnumber.message}</p>
              )}
            </div>

            <div className="mt-3">
              <div className="flex items-center space-x-4">
                <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  {...register("paymentMethod")}
                  className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="">Select Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500">{errors.paymentMethod.message}</p>
                )}
              </div>
            </div>

            {watch("paymentMethod") === "bank" && (
              <div className="mt-3">
                <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                  Bank
                </label>
                <select
                  name="bankId"
                  {...register("bankId")}
                  className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="">Select Bank</option>
                  {banks?.map((bank) => (
                    <option key={bank._id} value={bank._id}>
                      {bank.bankName}
                    </option>
                  ))}
                </select>
                {errors.bankId && (
                  <p className="text-red-500">{errors.bankId.message}</p>
                )}
              </div>
            )}

            <PassengerForm
              passengers={watch("passengers") || []}
              setPassengers={(newPassengers) => {
                setValue("passengers", newPassengers);
              }}
            />
            <HotelVoucherForm
              rooms={rooms}
              setRooms={setRooms}
              hotels={hotels}
            />

            <div className="flex justify-center mt-4 mb-3">
              <SubmitButton
                text="Submit"
                submit={handleSubmit(submit)}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default CashVoucherPopup;
