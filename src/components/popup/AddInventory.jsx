import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButton";
import axios from "../../axios";
import Loader from "../../components/CircularLoader";

const AddInventoryPopup = ({ onClose }) => {
  const schema = Yup.object().shape({
    supplier: Yup.string().required("Supplier is required"),
    hotel: Yup.string().required("Hotel is required"),
    checkin: Yup.date().required("Check-In Date is required"),
    checkout: Yup.date()
      .required("Check-Out Date is required")
      .min(Yup.ref("checkin"), "Check-Out Date must be after Check-In Date"),
    roomDetails: Yup.array().of(
      Yup.object().shape({
        rooms: Yup.number()
          .min(1, "Rooms must be at least 1")
          .required("Rooms are required"),
        rate: Yup.number()
          .min(1, "Rate must be at least 1")
          .required("Rate is required"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [hotel, setHotel] = useState("");
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [roomDetails, setRoomDetails] = useState([
    { type: "Quint", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
    { type: "Quad", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
    { type: "Triple", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
    { type: "Double", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [hotelRooms, setHotelRooms] = useState([]);

  let debit = 0;
  let credit = 0 - grandTotal;

  async function onSubmitInventory() {
    setLoading(true);

    let ledgerObject = {
      title: "Rooms",
      credit: grandTotal,
      debit: 0,
      balance: 0 - grandTotal,
      role: "supplier",
      supId: supplier,
      hotelId: hotel,
      totalBalance: debit - credit,
    };
    console.log("ledger object is", ledgerObject);
    try {
      const ledgerResponse = await axios.post(
        "/ledger/createLedger",
        ledgerObject
      );
      console.log(ledgerResponse, "ledger response");
      let poformObject = {
        supplierID: supplier,
        hotelID: hotel,
        checkin,
        checkout,
        rooms: {
          quint: roomDetails[0].rooms,
          quad: roomDetails[1].rooms,
          triple: roomDetails[2].rooms,
          double: roomDetails[3].rooms,
        },
        bedRates: {
          quint: roomDetails[0].rate,
          quad: roomDetails[1].rate,
          triple: roomDetails[2].rate,
          double: roomDetails[3].rate,
        },
        role: "cash",
        debit: grandTotal,
        credit: 0,
        roomDetails: roomDetails,
      };
      const poformResponse = await axios.post(
        "/poform/createPoform",
        poformObject
      );
      // console.log(poformResponse, "poform response");

      // let filterHotel = hotels.filter((hot) => hot.id == hotel);
      // let roomCounter = 1;

      // let hotelObject = {
      //   location: filterHotel[0].location,
      //   name: filterHotel[0].name,
      //   totalRooms: 0,
      //   roomDetails,
      // };
      // const hotelUpdateResponse = await axios.put(
      //   `/hotel/editHotel/${hotel}`,
      //   hotelObject
      // );
      // console.log(hotelUpdateResponse, "hotel response");
      // setHotelRooms(hotelUpdateResponse.data.data.hotel.rooms);
      toast.success("Inventory added successfully");
      onClose();
    } catch (error) {
      console.log("Error submitting inventory:", error);
      toast.error(
        error?.response?.data?.message || "Failed to submit inventory"
      );
    }
    setLoading(false);
  }

  const getSuppliers = async () => {
    await axios
      .get("/user/getSuppliers")
      .then((res) => {
        console.log("data is", res.data);
        setSuppliers(res.data.data.suppliers); // Update to set the suppliers list
      })
      .catch((err) => {
        console.error("Failed to fetch suppliers:", err);
        toast.error("Failed to fetch suppliers");
      });
  };
  const getHotels = async () => {
    await axios
      .get("/hotel/getHotels")
      .then((res) => {
        console.log("data is hotels ", res.data);
        setHotels(res.data.data.hotels);
        // setCity(hotel.city)
      })
      .catch((err) => {
        console.error("Failed to fetch hotels:", err);
        toast.error("Failed to fetch hotels");
      });
  };
  useEffect(() => {
    getSuppliers();
    getHotels();
  }, []);

  useEffect(() => {
    if (hotel) {
      const selectedHotel = hotels.find((h) => h.id === hotel);
      setCity(selectedHotel?.location || "");
    } else {
      setCity("");
    }
  }, [hotel, hotels]);

  const handleRoomDetailChange = (index, field, value) => {
    const newRoomDetails = [...roomDetails];
    newRoomDetails[index][field] = value;

    if (field === "rooms") {
      newRoomDetails[index].beds = calculateBeds(newRoomDetails[index].type);
    }
    console.log("beds", newRoomDetails);

    setRoomDetails(newRoomDetails);
  };

  const calculateBeds = (type) => {
    const bedTypes = {
      Quint: 5,
      Quad: 4,
      Triple: 3,
      Double: 2,
    };
    return bedTypes[type] || 0;
  };

  const calculateTotal = (rooms, beds, rate, nights) => {
    return rooms && beds && rate && nights ? rooms * beds * rate * nights : 0;
  };

  useEffect(() => {
    const total = roomDetails.reduce((sum, detail) => {
      const detailTotal = calculateTotal(
        detail.rooms,
        detail.beds,
        detail.rate,
        detail.nights
      );
      return sum + detailTotal;
    }, 0);
    setGrandTotal(total);
  }, [roomDetails]);

  useEffect(() => {
    let diffDays = 0;
    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      const diffTime = Math.abs(checkoutDate - checkinDate);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    setRoomDetails((prevRoomDetails) =>
      prevRoomDetails.map((detail) => ({
        ...detail,
        nights: diffDays,
      }))
    );
  }, [checkin, checkout]);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="m-8 bg-black border border-white p-2 rounded-xl shadow-md px-3 md:px-8">
        <div className="flex flex-wrap justify-end">
          <div className="m-4 cursor-pointer bg-orange rounded-full">
            <img
              src={Cross}
              alt="cross-icon"
              onClick={onClose}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-Nunitoo text-orange text-24 font-medium pt-2 pb-4">
            PO Form/ Inventory
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="font-Nunitoo font-medium text-orange text-18 py-2">
              Select Supplier
            </label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="border border-blue3 bg-black text-white rounded-md p-2 w-full"
            >
              <option value="">Select Supplier</option>
              {suppliers?.length > 0
                ? suppliers.map((sup, index) => {
                    return (
                      <option key={index} value={sup.id}>
                        {sup.contactPerson}
                      </option>
                    );
                  })
                : "No supplier to show!"}
            </select>
            <label className="font-Nunitoo font-medium text-orange text-18 py-2 mt-2">
              Hotel Name
            </label>
            <select
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              className="border border-blue3 bg-black text-white rounded-md p-2 w-full"
            >
              <option value="">Select Hotel</option>
              {hotels?.length > 0
                ? hotels.map((hotel) => {
                    return (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </option>
                    );
                  })
                : "No hotel to show!"}
            </select>
            <label className="font-Nunitoo font-medium text-orange text-18 py-2 mt-2">
              City
            </label>
            <input
              type="text"
              value={city}
              // onChange={(e) => setCity(e.target.value)}
              readOnly
              className="border border-blue3 bg-black text-white rounded-md p-2 w-full"
            />
            <label className="font-Nunitoo font-medium text-orange text-14 py-2 mt-2">
              Check-In Date
            </label>
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="border border-blue3 bg-black text-white rounded-md p-2 w-full"
            />
            <label className="font-Nunitoo font-medium text-orange text-18 py-2 mt-2">
              Check-Out Date
            </label>
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="border border-blue3 bg-black text-white rounded-md p-2 w-full"
            />
          </div>
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
            <table className="w-full text-white">
              <thead>
                <tr>
                  <th className="text-left">Room Type</th>
                  <th className="pl-20 text-left">Rooms</th>
                  <th className="pl-4 text-left">Beds</th>
                  <th className="pl-16 text-left">Bed Rates</th>
                  <th className="pl-4 text-left">Nights</th>
                  <th className="pl-14 text-left">Total Payable</th>
                </tr>
              </thead>
              <tbody>
                {roomDetails?.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.type}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={detail.rooms}
                        onChange={(e) =>
                          handleRoomDetailChange(index, "rooms", e.target.value)
                        }
                        className="w-full text-white p-2 m-1"
                      />
                    </td>
                    <td className="pl-6">{detail.beds}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={detail.rate}
                        onChange={(e) =>
                          handleRoomDetailChange(index, "rate", e.target.value)
                        }
                        className="w-full text-white p-2 m-1"
                      />
                    </td>
                    <td className="pl-6">{detail.nights}</td>
                    <td>
                      <input
                        type="number"
                        value={calculateTotal(
                          detail.rooms,
                          detail.beds,
                          detail.rate,
                          detail.nights
                        )}
                        readOnly
                        className="w-full text-white p-2 m-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mt-2 mb-6">
          <p className="font-Nunitoo font-medium text-orange text-20 py-2 mt-2">
            Grand Total: {grandTotal}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <SubmitButton
            text="Submit"
            onSubmitInventory={onSubmitInventory}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddInventoryPopup;
