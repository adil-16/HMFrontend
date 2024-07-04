import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import AddInventoryPopup from "../../components/popup/AddInventory";
import CashVoucherPopup from "../../components/popup/CashVoucher";
import HotelVoucherPopup from "../../components/popup/HotelVoucher";
import ShowLedgerPopup from "../../components/popup/ShowLedger";
import ShowCurrencyPopup from "../../components/popup/AddCurrencyRate";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const cleanData = (data) =>
  data.map((item) => ({
    ...item,
    count: Math.max(item.count, 0),
    value: Math.max(item.value, 0),
  }));

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showLedgerPopup, setShowLedgerPopup] = useState(false);
  const [showCashVoucherPopup, setShowCashVoucherPopup] = useState(false);
  const [showHotelVoucherPopup, setShowHotelVoucherPopup] = useState(false);
  const [showAddCurrencyRatePopup, setShowAddCurrencyRatePopup] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (!loginStatus) {
      navigate("/");
      return;
    }

    const getData = async () => {
      try {
        const res = await axios.get("/dashboard/getDash");
        console.log("data is", res?.data);
        const { cards, rooms, roomBooked } = res?.data?.data;
        setCards(cards);
        setRooms(cleanData(rooms));
        setBookedRooms(cleanData(roomBooked));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  // useEffect(() => {
  //   const loginStatus = localStorage.getItem("login");
  //   if (!loginStatus) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const handleShowLedger = async (fromDate, toDate) => {
    try {
      const response = await axios.get(`/ledger/getAdminLedger/?role=cash`);
      console.log("Filtered Ledger Data: ", response.data);
      const totalBalance =
        response.data.ledgers.length > 0
          ? response.data.ledgers[0].totalBalance
          : 0;
      navigate("/admin/ledger", {
        state: {
          ledgerData: response.data.ledgers,
          userName: "Cash Account",
          totalBalance,
          fromDate,
          toDate,
        },
      });
      console.log("res data", response.data.ledgers);
      console.log("balance", totalBalance);
    } catch (error) {
      console.error("Error filtering ledgers:", error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <TopBar title="Dashboard" />
      <div className="p-1 sm:p-4 py-6 mr-3">
        <p className="font-Nunitoo text-white font-semibold text-16 sm:text-24 mb-8">
          Welcome Back, Admin
        </p>

        <div className="flex flex-wrap justify-start gap-4 mb-4">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-orange text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Add Inventory
          </button>

          <button
            onClick={() => setShowHotelVoucherPopup(true)}
            className="bg-white text-black px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Create Hotel Voucher
          </button>

          <button
            onClick={() => navigate("/admin/ledger-report")}
            className="bg-orange text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Ledger Reports
          </button>

          <button
            onClick={() => setShowCashVoucherPopup(true)}
            className="bg-orange text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Payment/Receipt Vouchers
          </button>

          <button
            onClick={() => navigate("/admin/customer-reports")}
            className="bg-white text-black px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Arrival/Departure Reports
          </button>

          <button
            onClick={() => setShowAddCurrencyRatePopup(true)}
            className="bg-orange text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Add Currency Rate
          </button>
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

      {showHotelVoucherPopup && (
        <HotelVoucherPopup onClose={() => setShowHotelVoucherPopup(false)} />
      )}

      {showAddCurrencyRatePopup && (
        <ShowCurrencyPopup onClose={() => setShowAddCurrencyRatePopup(false)} />
      )}
    </div>
  );
};

export default Dashboard;
