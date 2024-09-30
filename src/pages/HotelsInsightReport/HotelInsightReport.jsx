import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import 'hijri-date';

const CardComponent = ({heading, text})=>{
    return(
        
    <div className="w-full p-1 border border-solid">
        <div className="text-[8px]">{heading}</div>
        <div className="text-[10px] text-center w-full">{text}</div>
    </div>
    )
}

const dayData = {"Date": "2024-08-13",
    "rooms": {
        "quint": 5,
        "quad": 0,
        "triple": 0,
        "double": 0,
        "total": 5
    },
    "beds": {
        "quint": 25,
        "quad": 0,
        "triple": 0,
        "double": 0,
        "total": 25
    }
}

const HotelDayCard = ({inventory, booking, remainingBooking, allBooking, wastage, paidWastage, roomType})=>{
    const islamicDate = new Date(inventory.Date).toHijri();
    return(
        <div className="min-w-[170px] text-black border-2 border-solid">
            <CardComponent heading={"Date"} text={inventory.Date}/>
            <CardComponent heading="Islamic Date" text={`${islamicDate.getDate()}/${islamicDate.getMonth()}/${islamicDate.getFullYear()}`}/>
            <CardComponent heading="Day" text={islamicDate._dayName}/>
            <div className="flex">
                <div className="w-1/2">
                    <div className=" text-center text-[10px] font-bold border border-solid">Rooms ({roomType})</div>
                    <CardComponent heading="Inventory" text={""+inventory.rooms[roomType]}/>
                    <CardComponent heading="Bookings" text={booking.rooms[roomType]}/>
                    <CardComponent heading="Pending Bookings" text={remainingBooking.rooms[roomType]}/>
                    <CardComponent heading="Total Bookings" text={allBooking.rooms[roomType]}/>
                    <CardComponent heading="Wastage" text={wastage.rooms[roomType]}/>
                    <CardComponent heading="Paid Wastage" text={paidWastage.rooms[roomType]}/>
                </div>
                <div className="w-1/2">
                    <div className=" text-center text-[10px] font-bold  border border-solid">Beds ({roomType})</div>
                    <CardComponent heading="Inventory" text={inventory.beds[roomType]}/>
                    <CardComponent heading="Bookings" text={booking.beds[roomType]}/>
                    <CardComponent heading="Pending Bookings" text={remainingBooking.beds[roomType]}/>
                    <CardComponent heading="Total Bookings" text={allBooking.beds[roomType]}/>
                    <CardComponent heading="Wastage" text={wastage.beds[roomType]}/>
                    <CardComponent heading="Paid Wastage" text={paidWastage.beds[roomType]}/>
                </div>
            </div>
        </div>
    )
}

const ShowHotel = ({hotel, roomType})=>{
    return (
        <div className="w-full">
            <div className="text-center text-black bg-white">
                {hotel.hotelName}({hotel.hotelLocation})
            </div>
            <div className="flex w-[1100px] overflow-x-auto bg-white">
                {hotel.insight.inventory.map((hotelInventory, index)=>{
                    console.log(hotelInventory)
                    //  booking, remainingBooking, allBooking, wastage, paidWastage
                    return (
                        <HotelDayCard inventory={hotelInventory} 
                        booking={hotel.insight.booking[index]} 
                        allBooking={hotel.insight.allBooking[index]}
                        remainingBooking={hotel.insight.remainingBooking[index]}
                        wastage={hotel.insight.wastage[index]}
                        paidWastage={hotel.insight.paidWastage[index]}
                        roomType={roomType}/>
                    )
                })}
            </div>
        </div>
    )
}
const HotelInsightReport = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roomType, setRoomType] = useState("total");


  const getHotelsInformation = ()=>{
    if(startDate>endDate){
        alert("Wrong Date, Start Date should be less than End Date");
        return
    }
    axios
        .get(`/hotel/insights`, {
          params: { startDate, endDate },
        })
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data.hotelsInsight);
          setLoading(false);
        })
        .catch(() => {
        //   setLoading(false);
        });
  }

  return (
    <div className="w-full ">
      <TopBar title="Hotels Insight" />
      <div className="p-1 sm:p-8 py-6">
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="total">Total</option>
            <option value="quint">Quint</option>
            <option value="quad">Quad</option>
            <option value="triple">Triple</option>
            <option value="double">Double</option>
            {/* Add more room types as needed */}
          </select>
          <button onClick={()=>{
            getHotelsInformation();
          }}>
            Get Report
          </button>
        </div>
        <div className="mx-1 mt-6 w-full overflow-x-hidden bg-green">
          <div className="space-y-4">
            {
                data.map(
                    (hotel)=>{
                        return (
                           <ShowHotel hotel={hotel} roomType={roomType}/>
                        )
                    }
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInsightReport;