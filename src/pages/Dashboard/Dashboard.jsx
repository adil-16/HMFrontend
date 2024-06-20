import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import DashboardCard from "../../components/cards/DashboardCard";
import PieChartt from "../../components/chart/PieChart";
import ReportCard from "../../components/cards/ReportCard";
import Graphs from "../../components/chart/Graphs";
import AddInventoryPopup from "../../components/popup/AddInventory";
import CashVoucherPopup from "../../components/popup/CashVoucher";
import axios from "../../axios";
import ShowLedgerPopup from "../../components/popup/ShowLedger";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showLedgerPopup, setShowLedgerPopup] = useState(false);
  const [showCashVoucherPopup, setShowCashVoucherPopup] = useState(false);
  const navigate = useNavigate();

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

  const handleShowLedger = (fromDate, toDate) => {
    console.log("Show Ledger for dates:", fromDate, toDate);

    axios
      .get(`ledger/getAdminLedger/?role=cash`)
      .then((res) => {
        console.log("Filtered Ledger Data: ", res.data);
        const totalBalance =
          res.data.ledgers.length > 0 ? res.data.ledgers[0].totalBalance : 0;
        navigate("/admin/ledger", {
          state: {
            ledgerData: res.data.ledgers,
            supplierName: "Cash",
            totalBalance,
            fromDate,
            toDate,
          },
        });
        console.log("res data", res.data.ledgers);
        console.log("balance", totalBalance);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

        <button
          onClick={() => setShowLedgerPopup(true)} // Open the popup on button click
          className="bg-orange text-white px-4 py-2 rounded-lg ml-6"
        >
          Show Cash Ledger
        </button>
        <button
          onClick={() => setShowCashVoucherPopup(true)}
          className="bg-orange text-white px-4 py-2 rounded-lg ml-6"
        >
          Cash Vouchers
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

      {showLedgerPopup && (
        <ShowLedgerPopup
          onClose={() => setShowLedgerPopup(false)}
          onSubmit={handleShowLedger}
        />
      )}
      {showCashVoucherPopup && (
        <CashVoucherPopup onClose={() => setShowCashVoucherPopup(false)} />
      )}
    </div>
  );
};

export default Dashboard;
