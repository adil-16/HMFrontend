import React, { useState, useEffect } from "react";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const schema = yup.object().shape({
  hotelId: yup.string().required("Hotel is required"),
  roomId: yup.string().when("hotelId", {
    is: (val) => !!val,
    then: (schema) => schema.required("Room is required"),
  }),
});

const CashVoucherPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const selectedHotelId = watch("hotelId");

  const getHotels = async () => {
    await axios
      .get("/hotel/getHotels")
      .then((res) => {
        console.log("data is hotels ", res.data);
        setHotels(res.data.data.hotels);
      })
      .catch((err) => {
        console.error("Failed to fetch hotels:", err);
        toast.error("Failed to fetch hotels");
      });
  };
  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    if (selectedHotelId) {
      const selectedHotel = hotels.find(
        (hotel) => hotel.id === selectedHotelId
      );
      if (selectedHotel) {
        setRooms(selectedHotel.rooms || []);
      } else {
        setRooms([]);
      }
    } else {
      setRooms([]);
    }
  }, [selectedHotelId, hotels]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const selectedHotel = hotels.find((hotel) => hotel.id === data.hotelId);
      const selectedRoom = rooms.find((room) => room._id == data.roomId);
      const currentDate = moment().format("YYYY-MM-DD");

      if (selectedHotel) {
        navigate(`/admin/room-ledger/${selectedRoom._id}`, {
          state: {
            room: selectedRoom,
            hotelId: selectedHotel.id,
            hotelName: selectedHotel.name,
            printDate: currentDate,
            // roomNumber: selectedRoom.roomNumber,
          },
        });
      }
      toast.success("Report Generated Successfully!");
      onClose();
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Error generating report!");
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-black border border-white p-4 rounded-xl shadow-md px-6 md:px-8">
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
            Room Profit and Loss Report
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Select Hotel
            </label>
            <Controller
              name="hotelId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="">Select Hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.hotelId && (
              <p className="text-red-500">{errors.hotelId.message}</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Select Room
            </label>
            <Controller
              name="roomId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="">Select Room</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.roomNumber}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.roomId && (
              <p className="text-red-500">{errors.roomId.message}</p>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <SubmitButton
              text="Submit"
              submit={handleSubmit(onSubmit)}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashVoucherPopup;
