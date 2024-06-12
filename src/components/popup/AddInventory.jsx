import React, { useState, useEffect } from "react";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButton";
import axios from "../../axios";

const AddInventoryPopup = ({ onClose }) => {
    const [supplier, setSupplier] = useState("");
    const [suppliers, setSuppliers] = useState([]); // New state to store suppliers list
    const [hotel, setHotel] = useState("");
    const [city, setCity] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [roomDetails, setRoomDetails] = useState([
      { type: "Shared", rooms: "", beds: 10, rate: "", nights: 10, total: "" },
      { type: "Quad", rooms: "", beds: 10, rate: "", nights: 10, total: "" },
      { type: "Triple", rooms: "", beds: 10, rate: "", nights: 10, total: "" },
      { type: "Double", rooms: "", beds: 10, rate: "", nights: 10, total: "" },
    ]);
  
    useEffect(() => {
      const getData = async () => {
        await axios
          .get("/user/getSuppliers")
          .then((res) => {
            console.log("data is", res.data);
            setSuppliers(res.data.suppliers); // Update to set the suppliers list
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getData();
    }, []);

  const handleRoomDetailChange = (index, field, value) => {
    const newRoomDetails = [...roomDetails];
    newRoomDetails[index][field] = value;
    setRoomDetails(newRoomDetails);
  };

  const calculateTotal = (rooms, rate, nights) => {
    return rooms && rate && nights ? rooms * rate * nights : "";
  };

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
          <h2 className="font-Nunitoo text-orange text-19 font-medium pt-2 pb-2">
            PO Form/ Inventory
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="font-Nunitoo font-medium text-orange text-14 py-2">
              Select Supplier
            </label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="border border-blue3 bg-white text-black rounded-md p-2 w-full"
            >
              <option value="">Select Supplier</option>
              {/* Add supplier options here */}
            </select>
            <label className="font-Nunitoo font-medium text-orange text-14 py-2 mt-2">
              Hotel Name
            </label>
            <select
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              className="border border-blue3 bg-white text-black rounded-md p-2 w-full"
            >
              <option value="">Select Hotel</option>
              {/* Add hotel options here */}
            </select>
            <label className="font-Nunitoo font-medium text-orange text-14 py-2 mt-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-blue3 bg-white text-black rounded-md p-2 w-full"
            />
            <label className="font-Nunitoo font-medium text-orange text-14 py-2 mt-2">
              Check-In Date
            </label>
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="border border-blue3 bg-white text-black rounded-md p-2 w-full"
            />
            <label className="font-Nunitoo font-medium text-orange text-14 py-2 mt-2">
              Check-Out Date
            </label>
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="border border-blue3 bg-white text-black rounded-md p-2 w-full"
            />
          </div>
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
            <table className="w-full text-white">
              <thead>
                <tr>
                  <th className="text-left">Room Type</th>
                  <th className="text-left">Rooms</th>
                  <th className="text-left">Beds</th>
                  <th className="text-left">Room Rates</th>
                  <th className="text-left">Nights</th>
                  <th className="text-left">Total Payable</th>
                </tr>
              </thead>
              <tbody>
                {roomDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.type}</td>
                    <td>
                      <input
                        type="number"
                        value={detail.rooms}
                        onChange={(e) =>
                          handleRoomDetailChange(index, "rooms", e.target.value)
                        }
                        className="w-full bg-gray-800 text-white p-1"
                      />
                    </td>
                    <td>{detail.beds}</td>
                    <td>
                      <input
                        type="number"
                        value={detail.rate}
                        onChange={(e) =>
                          handleRoomDetailChange(index, "rate", e.target.value)
                        }
                        className="w-full bg-gray-800 text-white p-1"
                      />
                    </td>
                    <td>{detail.nights}</td>
                    <td>
                      <input
                        type="number"
                        value={calculateTotal(
                          detail.rooms,
                          detail.rate,
                          detail.nights
                        )}
                        readOnly
                        className="w-full bg-gray-800 text-white p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <SubmitButton text="Submit" />
        </div>
      </div>
    </div>
  );
};

export default AddInventoryPopup;
