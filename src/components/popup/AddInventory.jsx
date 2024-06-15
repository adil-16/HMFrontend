import React, { useState, useEffect } from "react";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButton";
import axios from "../../axios";

const AddInventoryPopup = ({ onClose }) => {
  const [supplier, setSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [hotel, setHotel] = useState("");
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [roomDetails, setRoomDetails] = useState([
    { type: "Shared", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
    { type: "Quad", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
    { type: "Triple", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
    { type: "Double", rooms: "", beds: 0, rate: "", nights: 0, total: "" },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/user/getSuppliers")
        .then((res) => {
          setSuppliers(res.data.suppliers);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("/user/getHotels")
        .then((res) => {
          setHotels(res.data.hotels);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    if (hotel) {
      const selectedHotel = hotels.find((h) => h.id === hotel);
      setCity(selectedHotel?.city || "");
    } else {
      setCity("");
    }
  }, [hotel, hotels]);

  const handleRoomDetailChange = (index, field, value) => {
    const newRoomDetails = [...roomDetails];
    newRoomDetails[index][field] = value;

    if (field === "rooms") {
      newRoomDetails[index].beds = calculateBeds(
        newRoomDetails[index].type,
        value
      );
    }

    setRoomDetails(newRoomDetails);
  };

  const calculateBeds = (type, rooms) => {
    const bedTypes = {
      Shared: 5,
      Quad: 4,
      Triple: 4,
      Double: 2,
    };
    return rooms * (bedTypes[type] || 0);
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
    setRoomDetails(prevRoomDetails => 
      prevRoomDetails.map(detail => ({
        ...detail,
        nights: diffDays
      }))
    );
  }, [checkin, checkout]);

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
              {suppliers?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
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
              {hotels?.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </select>
            <label className="font-Nunitoo font-medium text-orange text-18 py-2 mt-2">
              City
            </label>
            <input
              type="text"
              value={city}
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
                        value={detail.rooms}
                        onChange={(e) =>
                          handleRoomDetailChange(index, "rooms", e.target.value)
                        }
                        className="w-full bg-gray-800 text-white p-2 m-1"
                      />
                    </td>
                    <td className="pl-6">{detail.beds}</td>
                    <td>
                      <input
                        type="number"
                        value={detail.rate}
                        onChange={(e) =>
                          handleRoomDetailChange(index, "rate", e.target.value)
                        }
                        className="w-full bg-gray-800 text-white p-2 m-1"
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
                        className="w-full bg-gray-800 text-white p-2 m-1"
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
          <SubmitButton text="Submit" />
        </div>
      </div>
    </div>
  );
};

export default AddInventoryPopup;
