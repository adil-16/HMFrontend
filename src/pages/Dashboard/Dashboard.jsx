import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import DashboardCard from "../../components/cards/DashboardCard";
import PieChartt from '../../components/chart/PieChart';
import ReportCard from "../../components/cards/ReportCard";
import Graphs from "../../components/chart/Graphs";
import AddInventoryPopup from "../../components/popup/AddInventory"; 
import axios from "../../axios";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/dashboard/getDash")
        .then((res) => {
          console.log("data is", res.data.data);
          setCards(res.data.data.cards);
          setRooms(res.data.data.rooms);
          setBookedRooms(res.data.data.roomBooked);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <div className="w-full">
      <TopBar title="Dashboard" />
      <div className="p-1 sm:p-4 py-6 mr-3">
        <p className="font-Nunitoo text-white font-semibold text-16 sm:text-24">
          Welcome Back, Admin
        </p>

        <div className="flex flex-wrap justify-between my-6">
          {cards.map((val, ind) => {
            return <DashboardCard data={val} key={ind} />;
          })}
        </div>

        <button
          onClick={() => setIsPopupOpen(true)} // Open the popup on button click
          className="bg-orange text-white px-4 py-2 rounded-lg"
        >
          + Add Inventory
        </button>

        <div className="flex flex-wrap justify-between items-center mt-6">
          <p className="font-Nunitoo text-white font-semibold text-24">
            Reports Overview
          </p>
        </div>

        <Graphs rooms={rooms} />

        <div className="flex flex-col sm:flex-row w-auto">
          <ReportCard rooms={cards} />
          <div className="flex justify-center">
            <PieChartt usersData={bookedRooms} screenWidth={screenWidth} />
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <AddInventoryPopup onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
