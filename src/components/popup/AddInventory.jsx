import React, { useState, useEffect } from "react";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButton";
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
const AddInventoryPopup = ({ onClose }) => {
    const [supplier, setSupplier] = useState("");
    const [suppliers, setSuppliers] = useState([]);
    const [hotels,setHotels]=useState([])
    const [hotel, setHotel] = useState("");
    const [city, setCity] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [roomDetails, setRoomDetails] = useState([
      { type: "Shared", rooms: "", beds: 5, rate: "", nights: 0, total: "" },
      { type: "Quad", rooms: "", beds: 4, rate: "", nights: 0, total: "" },
      { type: "Triple", rooms: "", beds: 3, rate: "", nights: 0, total: "" },
      { type: "Double", rooms: "", beds: 2, rate: "", nights: 0, total: "" },
    ]);

    const calculateNights = () => {
      if (!checkin || !checkout) return 0; 
  
      const oneDay = 24 * 60 * 60 * 1000; 
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      const diffDays = Math.round(Math.abs((checkoutDate - checkinDate) / oneDay));
  
      return diffDays;
  };
  

  async function onSubmitInventory(){
    let totalCredit=roomDetails.reduce((acc,r)=>{
      acc+=r.total
      return acc
    },0)
    
    let ledgerObject={
      title:"Rooms",
      credit:totalCredit,
      debit:0,
      balance:0-totalCredit,
      role:"supplier",
      supId:supplier,
      hotelId:hotel
    }
  try {
    const ledgerResponse=await axios.post("http://localhost:8000/ledger/createLedger",ledgerObject)
    console.log(ledgerResponse,"ledger response")
    let totalCredit=roomDetails.reduce((acc,r)=>{
      acc+=r.total
      return acc
    },0)
      let poformObject={
        supplierID:supplier,
        hotelID:hotel,
        checkin,
        checkout,
        rooms:{
          shared:roomDetails[0].rooms,
          quad:roomDetails[1].rooms,
          triple:roomDetails[2].rooms,
          double:roomDetails[3].rooms
        },
        bedRates:{
          shared:roomDetails[0].rate,
          quad:roomDetails[1].rate,
          triple:roomDetails[2].rate,
          double:roomDetails[3].rate
        },
        role:"cash",
        debit:totalCredit,
        credit:0
      }
      const poformResponse=await axios.post("http://localhost:8000/poform/createPoform",poformObject)
      console.log(poformResponse,"poform response")
    
      const filterHotel=hotels.filter(hot=>hot.id==hotel)
      let roomCounter = 1; 
    const rooms= roomDetails.reduce((acc, roomDetail) => {

    const numRooms = parseInt(roomDetail.rooms);
    for (let i = 1; i <= numRooms; i++) {
      const roomNumber = uuidv4()
      const beds = [];
      for (let j = 1; j <= roomDetail.beds; j++) {
        beds.push({
          bedNumber: j,
          bedRate: roomDetail.rate || 0, 
        });
      }
      acc.push({
        roomType: roomDetail.type,
        roomNumber: roomNumber.toString(),
        totalBeds: roomDetail.beds,
        beds: beds,
      });
    }
    return acc;
  }, []);
 
      let hotelObject={
        location:filterHotel[0].location,
        name:filterHotel[0].name,
        totalRooms:rooms.length,
        rooms

      }
      const hotelUpdateResponse=await axios.put(`http://localhost:8000/hotel/updateHotel/${hotel}`,hotelObject)
      console.log(hotelUpdateResponse,"hotel response")
  
  } catch (error) {
    console.log(error)
  }
  }


    const getSuppliers = async () => {
      await axios
        .get("http://localhost:8000/user/getSuppliers")
        .then((res) => {
          console.log("data is", res.data);
          setSuppliers(res.data.data.suppliers); // Update to set the suppliers list
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getHotels = async () => {
      await axios
        .get("http://localhost:8000/hotel/getHotels")
        .then((res) => {
          console.log("data is hotels ", res.data);
          setHotels(res.data.data.hotels); 
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      getSuppliers();
      getHotels()
    }, []);
    const calculateTotal = (rooms, rate, nights) => {
      console.log(rooms,rate,nights)
      return rooms && rate && nights ? rooms * rate * nights:""
  };
    const handleRoomDetailChange = (index, field, value) => {
      const newRoomDetails = [...roomDetails];
      newRoomDetails[index][field] = value;
      
      if (field === "rate") {
        newRoomDetails[index].total = calculateTotal(newRoomDetails[index].rooms, value, calculateNights());
      }
    
      setRoomDetails(newRoomDetails);
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
              {suppliers?.length>0 ? suppliers.map((sup,index)=>{
                return <option key={index} value={sup.id}>{sup.name}</option>
              }) :"No supplier to show!"}
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
              {hotels?.length>0 ? hotels.map(hotel=>{
                return <option value={hotel.id}>{hotel.name}</option>
              }) :"No hotel to show!"}
            </select>
            <label className="font-Nunitoo font-medium text-orange text-14 py-2 mt-2">
              City
            </label>
            <input
              type="text"
              value={city}
              disabled
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
                        className="w-full bg-gray-800 text-black p-1"
                      />
                    </td>
                    <td>{detail.beds * detail.rooms}</td>
                    <td>
                      <input
                        type="number"
                        value={detail.rate}
                        onChange={(e) =>
                          handleRoomDetailChange(index, "rate", e.target.value)
                        }
                        className="w-full bg-gray-800 text-black p-1"
                      />
                    </td>
                    <td>{calculateNights()}</td>
                    <td>
                      <input
                        type="number"
                        value={detail.total}
                        readOnly
                        className="w-full bg-gray-800 text-black p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <SubmitButton text="Submit" onSubmitInventory={onSubmitInventory} />
        </div>
      </div>
    </div>
  );
};

export default AddInventoryPopup;
