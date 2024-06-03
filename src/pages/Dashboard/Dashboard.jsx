import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import DashboardCard from "../../components/cards/DashboardCard";
import PieChartt from '../../components/chart/PieChart'
import ReportCard from "../../components/cards/ReportCard";
import Graphs from "../../components/chart/Graphs";
import axios from "../../axios";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
 
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/dashboard/getDash")
        .then((res) => {
          // setData(res.data.data.hotel);
          console.log("data is", res.data.data);
          setCards(res.data.data.cards);
          setRooms(res.data.data.rooms);
          setBookedRooms(res.data.data.roomBooked);
        })
        .catch((err) => {
          console.log(err)
          // //   setCategoryapi(true)
          // setLoader(false)
          //   setError(err.response.data.data.error);
        });
    };
    getData();
  }, []);

  return (
    <div className="w-full">
      <TopBar title="Dashboard" />
      {/* body */}
      <div className="p-1 sm:p-4 py-6 mr-3">
        <p className="font-Nunitoo text-white font-semibold text-16 sm:text-24">
          Welcome Back, Admin
        </p>

        {/* top cards */}
        <div className="flex flex-wrap justify-between my-6">
          {cards.map((val, ind) => {
            return <DashboardCard data={val} key={ind} />;
          })}
        </div>
        {/* head */}
        <div className="flex flex-wrap justify-between items-center">
          <p className="font-Nunitoo text-white font-semibold text-24">
            Reports Overview
          </p>
        </div>
        {/* graph */}
        <Graphs rooms={rooms} />

        {/* report */}
        <div className="flex flex-col  sm:flex-row w-auto">
          <ReportCard rooms={cards} />
          <div className="flex justify-center">
            <PieChartt usersData={bookedRooms} screenWidth={screenWidth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
